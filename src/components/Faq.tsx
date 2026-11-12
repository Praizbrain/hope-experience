import Link from "next/link";
import type { ReactNode } from "react";

const faqs: { q: string; a: ReactNode }[] = [
    {
        q: "What is Hope Experience?",
        a: "Hope Experience is an event where Jesus meets men. It is an atmosphere of pure praise and worship that leaves you with an amazing encounter for life. This year, The Invaxion marks a decade of hope and transformation.",
    },
    {
        q: "When and where will the event take place?",
        a: "Thursday, 17 December 2026 at 8PM, at Ugbekun Primary School Field, opposite Jesus Christ junction, Upper Sakponba Road, Benin City, Edo State.",
    },
    {
        q: "Is this event open for everyone?",
        a: "Yes. Everyone is welcome, whatever your church or background.",
    },
    {
        q: "Is it free?",
        a: "Yes. Entry is free and you do not need to register.",
    },
    {
        q: "Can I volunteer for Hope Experience?",
        a: (
            <>
                Yes. You can{" "}
                <a
                    href="https://hopeexperience10.vercel.app"
                    className="text-lime underline underline-offset-4"
                >
                    join the workforce here
                </a>
                . Children and teens aged 6 to 16 can also join the choir: call or WhatsApp Angela on
                +234 705 1925 164.
            </>
        ),
    },
    {
        q: "How can I partner with Hope Experience?",
        a: (
            <>
                Your gift covers the stage, sound and outreach.{" "}
                <Link href="/partner" className="text-lime underline underline-offset-4">
                    Give securely here
                </Link>
                .
            </>
        ),
    },
];

export default function Faq() {
    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2">
            <div>
                <p className="text-sm font-bold uppercase tracking-widest text-lime">FAQ</p>
                <h2 className="mt-2 font-display text-5xl font-extrabold uppercase sm:text-6xl">
                    Plan Your Experience
                </h2>

                {/* Optional partner card: delete this whole block to remove it */}
                <div className="mt-8 max-w-sm rounded-2xl border border-lime/30 bg-pitch p-6">
                    <p className="font-display text-2xl font-extrabold uppercase">Help us reach one more life</p>
                    <p className="mt-2 text-silver/80">
                        Hope Experience is free for everyone. Your gift makes it possible.
                    </p>
                    <Link
                        href="/partner"
                        className="mt-4 inline-block rounded-full bg-lime px-6 py-3 font-bold text-forest hover:bg-gold"
                    >
                        Partner with us
                    </Link>
                </div>
            </div>

            <div className="border-t border-white/20">
                {faqs.map((f) => (
                    <details key={f.q} className="group border-b border-white/20 py-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold group-open:text-lime [&::-webkit-details-marker]:hidden">
                            {f.q}
                            <span className="text-3xl leading-none transition group-open:rotate-45">+</span>
                        </summary>
                        <div className="mt-3 text-lg text-silver/85">{f.a}</div>
                    </details>
                ))}
            </div>
        </section>
    );
}