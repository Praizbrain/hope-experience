import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { TEAMS } from "@/lib/plan";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Hidden field only bots fill in: pretend success and save nothing.
        if (body.website) return NextResponse.json({ ok: true });

        const fullName = String(body.fullName ?? "").trim();
        const phone = String(body.phone ?? "").replace(/[^\d+]/g, "");
        const digits = phone.replace(/\D/g, "");
        const team = String(body.team ?? "");

        if (fullName.length < 2) {
            return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
        }
        if (digits.length < 10 || digits.length > 13) {
            return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
        }
        if (!TEAMS.includes(team)) {
            return NextResponse.json({ error: "Please choose a team." }, { status: 400 });
        }

        const clean = (v: unknown) => {
            const s = String(v ?? "").trim();
            return s ? s : null;
        };

        const { error } = await supabaseAdmin().from("volunteers").insert({
            full_name: fullName,
            phone,
            email: clean(body.email),
            area: clean(body.area),
            team,
            church: clean(body.church),
            message: clean(body.message),
        });
        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { error: "We couldn't save your details. Please try again." },
            { status: 500 }
        );
    }
}