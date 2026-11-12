import { NextResponse } from "next/server";
import { isValidSignature } from "@/lib/payments/paystack";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const raw = await req.text();

    if (!isValidSignature(raw, req.headers.get("x-paystack-signature"))) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(raw);
    const db = supabaseAdmin();

    if (event.event === "charge.success") {
        const { reference, amount } = event.data;
        const { data: row } = await db
            .from("partnerships")
            .select("amount_kobo")
            .eq("reference", reference)
            .single();

        // Only mark paid if the amount Paystack collected matches what we recorded.
        if (row && row.amount_kobo === amount) {
            await db
                .from("partnerships")
                .update({ status: "success", paid_at: new Date().toISOString() })
                .eq("reference", reference);
        }
    } else if (event.event === "charge.failed") {
        await db
            .from("partnerships")
            .update({ status: "failed" })
            .eq("reference", event.data.reference);
    }

    return NextResponse.json({ received: true });
}