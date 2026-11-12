"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Countdown from "@/components/Countdown";
import { EVENT } from "@/lib/event";

// The headline changes with every photo. Add more lines here and they join the cycle.
const HEADLINES = [
    { line1: "Hope Experience", line2: "10" },
    { line1: "An event where", line2: "Jesus meets men" },
];

const SLIDE_SECONDS = 6;
const DAY = "17";
const MONTH_YEAR = "December 2026";

export default function Hero({ images }: { images: string[] }) {
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();
    const count = Math.max(images.length, HEADLINES.length);

    useEffect(() => {
        const id = setInterval(() => setI((n) => (n + 1) % count), SLIDE_SECONDS * 1000);
        return () => clearInterval(id);
    }, [count]);

    const headline = HEADLINES[i % HEADLINES.length];
    const image = images.length ? images[i % images.length] : null;

    return (
        <section className="relative isolate overflow-hidden bg-forest">
            {/* Photos */}
            <div className="absolute inset-0" aria-hidden>
                <AnimatePresence>
                    {image && (
                        <motion.div
                            key={image}
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.4 }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                initial={{ scale: 1.05 }}
                                animate={{ scale: reduce ? 1.05 : 1.16 }}
                                transition={{ duration: SLIDE_SECONDS + 2, ease: "linear" }}
                            >
                                <Image
                                    src={image}
                                    alt=""
                                    fill
                                    priority={i === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-forest/75 via-forest/15 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-forest/50 via-transparent to-forest/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-between gap-10 px-4 py-8 sm:py-12">
                <div>
                    <h1 className="sr-only">
                        Hope Experience 10, The Invaxion. An event where Jesus meets men.
                    </h1>
                    <div aria-hidden className="min-h-[6.5rem] sm:min-h-[11rem] lg:min-h-[17rem]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={i % HEADLINES.length}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="hero-text font-display text-[clamp(2.6rem,10.5vw,9rem)] font-extrabold uppercase leading-[0.92]"
                            >
                                {headline.line1}
                                <br />
                                <span className="text-lime">{headline.line2}</span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
                        <Link
                            href="/partner"
                            className="inline-flex h-11 items-center whitespace-nowrap rounded-full bg-lime px-5 text-sm font-bold text-forest hover:bg-gold sm:h-14 sm:px-8 sm:text-lg"
                        >
                            Partner with us
                        </Link>
                        <Link
                            href="/plan"
                            className="inline-flex h-11 items-center whitespace-nowrap rounded-full border border-silver/50 px-5 text-sm font-bold hover:border-lime hover:text-lime sm:h-14 sm:px-8 sm:text-lg"
                        >
                            <span className="sm:hidden">Plan your visit</span>
                            <span className="hidden sm:inline">Plan your experience</span>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="hero-text">
                        <Countdown target={EVENT.dateISO} />
                        <div className="mt-4 flex gap-2" aria-hidden>
                            {Array.from({ length: count }).map((_, n) => (
                                <span
                                    key={n}
                                    className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-lime" : "w-3 bg-white/40"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hero-text self-end text-right font-display font-extrabold uppercase leading-none">
                        <div className="text-[clamp(4.5rem,15vw,10rem)]">{DAY}</div>
                        <div className="text-[clamp(1.5rem,4.5vw,3.2rem)] text-gold">{MONTH_YEAR}</div>
                        <div className="mt-2 font-sans text-base font-bold normal-case tracking-wide text-silver sm:text-xl">
                            {EVENT.timeLabel}. Free entry
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}