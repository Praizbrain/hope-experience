import Link from "next/link";
import { verifyTransaction } from "@/lib/payments/paystack";
import { supabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = { title: "Thank you | Hope Experience 10" };

export default async function ThankYou({
    searchParams,
}: {
    searchParams: Promise<{ ref?: string; reference?: string }>;
}) {
    const sp = await searchParams;
    const reference = sp.reference || sp.ref;
    let paid = false;

    if (reference) {
        try {
            const tx = await verifyTransaction(reference);
            if (tx.status === "success") {
                const db = supabaseAdmin();
                const { data: row } = await db
                    .from("partnerships")
                    .select("amount_kobo")
                    .eq("reference", reference)
                    .single();

                // Only accept it if the amount Paystack collected matches what we recorded.
                if (row && row.amount_kobo === tx.amount) {
                    await db
                        .from("partnerships")
                        .update({ status: "success", paid_at: new Date().toISOString() })
                        .eq("reference", reference)
                        .neq("status", "success");
                    paid = true;
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
            <h1 className="font-display text-5xl font-extrabold uppercase text-lime sm:text-6xl">
                {paid ? "Thank you for partnering with us" : "We are confirming your gift"}
            </h1>
            <p className="mt-4 text-lg text-silver/85">
                {paid
                    ? "Your gift is helping us reach more lives on 17 December. A receipt is on its way to your email."
                    : "If you completed your payment, you will receive a Paystack receipt by email shortly."}
            </p>
            <Link
                href="/"
                className="mt-8 inline-block rounded-full bg-lime px-8 py-3 font-bold text-forest"
            >
                Back to home
            </Link>
        </main>
    );
}