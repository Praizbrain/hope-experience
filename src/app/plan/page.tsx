import Link from "next/link";
import type { ReactNode } from "react";
import { EVENT } from "@/lib/event";
import {
    BUSES,
    FLYERS,
    CHOIR,
    WORKFORCE_URL,
    callHref,
    whatsappHref,
} from "@/lib/plan";

export const metadata = { title: "Plan your experience | Hope Experience 10" };

const btn =
    "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-sm font-bold sm:text-base";
const btnSolid = `${btn} bg-lime text-forest hover:bg-gold`;
const btnLine = `${btn} border border-lime text-lime hover:bg-lime hover:text-forest`;

function PhoneIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
    );
}

function ChatIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.6-5.4A8.4 8.4 0 1 1 21 11.5Z" />
        </svg>
    );
}

function DownloadIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16" />
        </svg>
    );
}

function Card({ title, body, children }: { title: string; body: string; children: ReactNode }) {
    return (
        <div className="flex flex-col rounded-2xl border border-white/10 bg-pitch p-6">
            <h3 className="font-display text-2xl font-extrabold uppercase">{title}</h3>
            <p className="mt-2 flex-1 text-silver/80">{body}</p>
            <div className="mt-5 flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

export default function PlanPage() {
    const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";
    const shareText = `Join us at Hope Experience 10, The Invaxion. ${EVENT.dateLabel}, ${EVENT.timeLabel}. ${EVENT.venue}, Benin City. Free entry. ${site}`;
    const shareHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        EVENT.venue + " Benin City"
    )}`;

    return (
        <main>
            {/* Header and event details */}
            <section className="bg-pitch">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
                    <h1 className="font-display text-5xl font-extrabold uppercase sm:text-7xl">
                        Plan your <span className="text-lime">experience</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-silver/85">
                        {EVENT.venue}. {EVENT.address}.
                    </p>
                    <p className="mt-2 text-lg text-gold">
                        {EVENT.dateLabel}, {EVENT.timeLabel}. Free entry.
                    </p>
                    <a href={mapsHref} className={`${btnSolid} mt-6 w-full sm:w-auto`}>
                        Get directions
                    </a>
                </div>
            </section>

            {/* Get involved */}
            <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
                <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">Get involved</h2>
                <p className="mt-3 max-w-2xl text-silver/80">
                    There is a place for everyone. Serve, give, or help us spread the word.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card
                        title="Volunteer"
                        body="Join the workforce and serve at Hope Experience 10."
                    >
                        <a href={WORKFORCE_URL} className={btnSolid}>
                            Join the workforce
                        </a>
                    </Card>

                    <Card
                        title="Partner"
                        body="Your gift pays for the stage, the sound and the outreach."
                    >
                        <Link href="/partner" className={btnSolid}>
                            Partner with us
                        </Link>
                    </Card>

                    <Card
                        title="Advertise"
                        body="Download the flyer and share it with your friends, church and community."
                    >
                        {FLYERS.map((f) => (
                            <a key={f.file} href={f.file} download={f.name} className={btnSolid}>
                                <DownloadIcon />
                                {f.label}
                            </a>
                        ))}
                        <a href={shareHref} target="_blank" rel="noopener noreferrer" className={btnLine}>
                            <ChatIcon />
                            Share on WhatsApp
                        </a>
                    </Card>

                    <Card
                        title="Children and teens choir"
                        body="An interdenominational choir for children and teens aged 6 to 16."
                    >
                        <a href={callHref(CHOIR.phone)} className={btnLine}>
                            <PhoneIcon />
                            Call {CHOIR.name}
                        </a>
                        <a
                            href={whatsappHref(CHOIR.phone, "Hello, I would like to join the children and teens choir for Hope Experience 10.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={btnSolid}
                        >
                            <ChatIcon />
                            WhatsApp
                        </a>
                    </Card>
                </div>
            </section>

            {/* Free buses */}
            <section className="bg-pitch">
                <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
                    <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
                        Free <span className="text-lime">buses</span>
                    </h2>
                    <p className="mt-3 max-w-2xl text-silver/80">
                        Free transport is available from these locations. Tap Call or WhatsApp to reach the
                        person in charge of your pickup point.
                    </p>

                    <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {BUSES.map((b) => (
                            <li key={b.location} className="rounded-2xl border border-white/10 bg-forest p-5">
                                <h3 className="font-display text-2xl font-extrabold uppercase">{b.location}</h3>
                                <ul className="mt-3 space-y-4">
                                    {b.contacts.map((c) => (
                                        <li key={c.phone}>
                                            <p className="text-silver/90">
                                                <span className="font-bold">{c.name}</span>{" "}
                                                <span className="text-silver/60">{c.phone}</span>
                                            </p>
                                            <div className="mt-2 flex gap-2">
                                                <a href={callHref(c.phone)} className={btnLine}>
                                                    <PhoneIcon />
                                                    Call
                                                </a>
                                                <a
                                                    href={whatsappHref(
                                                        c.phone,
                                                        `Hello ${c.name}, I would like to take the free bus to Hope Experience 10 from ${b.location}.`
                                                    )}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={btnSolid}
                                                >
                                                    <ChatIcon />
                                                    WhatsApp
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}