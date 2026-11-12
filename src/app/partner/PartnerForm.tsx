"use client";
import { useState } from "react";
import { PRESET_AMOUNTS, MIN_AMOUNT } from "@/lib/event";

export default function PartnerForm({ initialAmount }: { initialAmount?: number }) {
    const [amount, setAmount] = useState<number | "">(initialAmount ?? 10000);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/paystack/initialize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, amount }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            window.location.href = data.url;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setLoading(false);
        }
    }

    const input =
        "w-full rounded-xl border border-white/20 bg-forest px-4 py-3 text-silver placeholder:text-silver/40";

    return (
        <form onSubmit={submit} className="space-y-5">
            <fieldset>
                <legend className="mb-2 font-bold">Choose your gift</legend>
                <div className="flex flex-wrap gap-2">
                    {PRESET_AMOUNTS.map((a) => (
                        <button
                            type="button"
                            key={a}
                            onClick={() => setAmount(a)}
                            aria-pressed={amount === a}
                            className={`rounded-full px-5 py-2 font-bold ${amount === a ? "bg-lime text-forest" : "border border-white/30"
                                }`}
                        >
                            ₦{a.toLocaleString()}
                        </button>
                    ))}
                </div>
                <label className="mt-3 block text-sm text-silver/80">
                    enter an amount (₦, minimum 10,000)
                    <input
                        type="number"
                        min={MIN_AMOUNT}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                        className={`${input} mt-1`}
                    />
                </label>
            </fieldset>

            <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={input}
            />
            <input
                required
                type="email"
                placeholder="Email (for your receipt)"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={input}
            />
            <input
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={input}
            />
            <textarea
                placeholder="A word for the team (optional)"
                rows={3}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={input}
            />

            {error && (
                <p role="alert" className="text-ember">
                    {error}
                </p>
            )}

            <button
                disabled={loading}
                className="w-full rounded-full bg-lime py-3 text-lg font-bold text-forest hover:bg-gold disabled:opacity-60"
            >
                {loading ? "Opening Paystack..." : "Give securely with Paystack"}
            </button>
        </form>
    );
}