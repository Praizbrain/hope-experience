import crypto from "crypto";

const BASE = "https://api.paystack.co";
const secret = () => process.env.PAYSTACK_SECRET_KEY!;

export async function initializeTransaction(input: {
    email: string;
    amountKobo: number;
    reference: string;
    callbackUrl: string;
    metadata?: Record<string, unknown>;
}) {
    const res = await fetch(`${BASE}/transaction/initialize`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${secret()}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: input.email,
            amount: input.amountKobo,
            reference: input.reference,
            callback_url: input.callbackUrl,
            currency: "NGN",
            metadata: input.metadata,
        }),
    });
    const json = await res.json();
    if (!res.ok || !json.status) {
        throw new Error(json.message || "Paystack initialize failed");
    }
    return json.data as { authorization_url: string; reference: string };
}

export function isValidSignature(rawBody: string, signature: string | null) {
    if (!signature) return false;
    const hash = crypto.createHmac("sha512", secret()).update(rawBody).digest("hex");
    return hash === signature;
}