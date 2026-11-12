import { NextResponse } from "next/server";
import crypto from "crypto";
import { initializeTransaction } from "@/lib/payments/paystack";
import { supabaseAdmin } from "@/lib/supabase/server";
import { MIN_AMOUNT } from "@/lib/event";

export async function POST(req: Request) {
    try {
        const { name, email, phone, message, amount } = await req.json();
        const naira = Number(amount);

        if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || "")) {
            return NextResponse.json(
                { error: "Enter your name and a valid email." },
                { status: 400 }
            );
        }
        if (!Number.isFinite(naira) || naira < MIN_AMOUNT) {
            return NextResponse.json(
                { error: `The minimum gift is ₦${MIN_AMOUNT.toLocaleString()}.` },
                { status: 400 }
            );
        }

        const amountKobo = Math.round(naira * 100);
        const reference = `HE10-${crypto.randomBytes(8).toString("hex")}`;

        const { error } = await supabaseAdmin().from("partnerships").insert({
            reference,
            name: name.trim(),
            email: email.trim(),
            phone: phone?.trim() || null,
            message: message?.trim() || null,
            amount_kobo: amountKobo,
        });
        if (error) throw error;

        const site = process.env.NEXT_PUBLIC_SITE_URL!;
        const data = await initializeTransaction({
            email,
            amountKobo,
            reference,
            callbackUrl: `${site}/partner/thank-you?ref=${reference}`,
            metadata: { name, phone },
        });

        return NextResponse.json({ url: data.authorization_url });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "We couldn't start the payment. Please try again." },
            { status: 500 }
        );
    }
}