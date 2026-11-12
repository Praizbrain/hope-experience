"use client";
import { useState } from "react";
import { TEAMS, WORKFORCE_WHATSAPP } from "@/lib/plan";

const empty = {
    fullName: "",
    phone: "",
    email: "",
    area: "",
    team: "",
    church: "",
    message: "",
    website: "", // hidden spam trap
};

export default function VolunteerForm() {
    const [form, setForm] = useState(empty);
    const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
    const [error, setError] = useState("");

    const set = (k: keyof typeof empty) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => setForm({ ...form, [k]: e.target.value });

    async function submit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("");
        setStatus("loading");
        try {
            const res = await fetch("/api/volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setStatus("done");
            setTimeout(() => {
                window.location.href = WORKFORCE_WHATSAPP;
            }, 2500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setStatus("idle");
        }
    }

    if (status === "done") {
        return (
            <div className="py-6 text-center">
                <h3 className="font-display text-4xl font-extrabold uppercase text-lime">
                    Thank you, {form.fullName.split(" ")[0]}!
                </h3>
                <p className="mt-3 text-lg text-silver/85">
                    You are on the list. One last step: join the workforce WhatsApp group for updates and
                    instructions. We are taking you there now.
                </p>
                <a
                    href={WORKFORCE_WHATSAPP}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-lime px-8 font-bold text-forest hover:bg-gold"
                >
                    Join the WhatsApp group
                </a>
            </div>
        );
    }

    const input =
        "mt-1 w-full rounded-xl border border-white/20 bg-forest px-4 py-3 text-silver placeholder:text-silver/40";
    const label = "block text-sm font-bold text-silver/90";

    return (
        <form onSubmit={submit} className="space-y-4">
            <label className={label}>
                Full name
                <input required value={form.fullName} onChange={set("fullName")} placeholder="Your full name" className={input} />
            </label>

            <label className={label}>
                WhatsApp phone number
                <input
                    required
                    type="tel"
                    inputMode="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="08012345678"
                    className={input}
                />
            </label>

            <label className={label}>
                Which team would you like to serve in?
                <select required value={form.team} onChange={set("team")} className={input}>
                    <option value="" disabled>
                        Choose a team
                    </option>
                    {TEAMS.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </label>

            <label className={label}>
                Email (optional)
                <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={input} />
            </label>

            <label className={label}>
                Area you live in (optional)
                <input value={form.area} onChange={set("area")} placeholder="e.g. Ugbowo, Egor, Ekosodin" className={input} />
            </label>

            <label className={label}>
                Your church (optional)
                <input value={form.church} onChange={set("church")} placeholder="Church name" className={input} />
            </label>

            <label className={label}>
                Anything we should know? (optional)
                <textarea rows={3} value={form.message} onChange={set("message")} className={input} />
            </label>

            {/* Spam trap: real people never see or fill this */}
            <div className="hidden" aria-hidden>
                <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                </label>
            </div>

            {error && (
                <p role="alert" className="text-ember">
                    {error}
                </p>
            )}

            <button
                disabled={status === "loading"}
                className="h-12 w-full rounded-full bg-lime text-lg font-bold text-forest hover:bg-gold disabled:opacity-60"
            >
                {status === "loading" ? "Sending..." : "Sign up to volunteer"}
            </button>
        </form>
    );
}