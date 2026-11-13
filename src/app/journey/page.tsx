import Image from "next/image";
import Link from "next/link";
import JourneyHero from "@/components/JourneyHero";
import WordReveal from "@/components/WordReveal";
import JourneyChapters from "@/components/JourneyChapters";
import ImpactLines from "@/components/ImpactLines";
import { EVENT, mediaUrl } from "@/lib/event";
import { MANIFESTO, MANIFESTO_HIGHLIGHT } from "@/lib/journey";

export const metadata = { title: "Our journey | Hope Experience 10" };

export default function JourneyPage() {
    return (
        <main>
            <JourneyHero />

            {/* The shift */}
            <section className="mx-auto max-w-5xl px-4 py-24 sm:py-40">
                <p className="mb-6 text-sm font-bold uppercase tracking-widest text-lime">The shift</p>
                <WordReveal
                    text={MANIFESTO}
                    highlight={MANIFESTO_HIGHLIGHT}
                    className="font-display text-[clamp(2rem,6.5vw,4.75rem)] font-extrabold uppercase leading-[1.05]"
                />
            </section>

            <JourneyChapters />

            <ImpactLines />

            {/* Finale */}
            <section className="relative isolate overflow-hidden bg-pitch">
                <div className="absolute inset-0 -z-10" aria-hidden>
                    <Image
                        src={mediaUrl("journey/finale.jpg")}
                        alt=""
                        fill
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 -z-10 bg-moss/30 mix-blend-multiply" aria-hidden />
                <div
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/35 to-black/45"
                    aria-hidden
                />

                <div className="mx-auto max-w-5xl px-4 py-24 text-center sm:py-40">
                    <p className="hero-text text-sm font-bold uppercase tracking-widest text-lime">
                        From an event to an identity
                    </p>
                    <h2 className="hero-text mt-4 font-display text-[clamp(2.6rem,10vw,7.5rem)] font-extrabold uppercase leading-[0.9]">
                        Come and see what happens when <span className="text-lime">Jesus meets men.</span>
                    </h2>
                    <p className="hero-text mt-6 text-lg text-gold">
                        {EVENT.dateLabel}, {EVENT.timeLabel}. {EVENT.venue}, Benin City. Free entry.
                    </p>
                    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link
                            href="/partner"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-lime px-10 text-lg font-bold text-forest hover:bg-gold"
                        >
                            Give and be part of the story
                        </Link>
                        <Link
                            href="/plan"
                            className="inline-flex h-14 items-center justify-center rounded-full border border-silver/50 px-10 text-lg font-bold hover:border-lime hover:text-lime"
                        >
                            Plan your experience
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}