"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "framer-motion";
import { mediaUrl } from "@/lib/event";
import { START_YEAR, END_YEAR } from "@/lib/journey";

export default function JourneyHero() {
    const ref = useRef<HTMLElement>(null);
    const [bad, setBad] = useState(false);
    const [year, setYear] = useState(START_YEAR);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60px", "end end"] });

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        const t = Math.min(1, Math.max(0, p));
        setYear(START_YEAR + Math.round(t * (END_YEAR - START_YEAR)));
    });

    const filter = useTransform(
        scrollYProgress,
        [0, 1],
        ["grayscale(1) brightness(0.7)", "grayscale(0) brightness(0.95)"]
    );
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
    const done = year === END_YEAR;

    return (
        <section
            ref={ref}
            className="relative h-[220svh] bg-black"
            aria-label="Ten years of Hope Experience"
        >
            <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden px-4 pb-8 pt-20 text-center sm:pt-24">
                {!bad && (
                    <motion.div className="absolute inset-0" style={{ filter, scale }} aria-hidden>
                        <Image
                            src={mediaUrl("journey/hero.jpg")}
                            alt=""
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                            onError={() => setBad(true)}
                        />
                    </motion.div>
                )}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/85"
                    aria-hidden
                />

                {/* Top: label */}
                <p className="relative z-10 text-sm font-bold uppercase tracking-widest text-lime sm:text-base">
                    Hope Experience 10 · Our journey
                </p>

                {/* Middle: the year */}
                <div className="relative z-10 flex flex-1 items-center justify-center">
                    <h1 className="sr-only">
                        Our journey, {START_YEAR} to {END_YEAR}
                    </h1>
                    <p
                        aria-hidden
                        className={`font-display text-[clamp(7rem,44vw,24rem)] font-extrabold leading-[0.85] tabular-nums ${done ? "text-lime [text-shadow:0_0_60px_rgba(77,255,0,0.6)]" : "text-outline"
                            }`}
                    >
                        {year}
                    </p>
                </div>

                {/* Bottom: hint or tagline */}
                <div className="relative z-10 flex min-h-[5.5rem] items-end justify-center pb-2">
                    <AnimatePresence mode="wait">
                        {done ? (
                            <motion.p
                                key="done"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="font-display text-3xl font-extrabold uppercase leading-none sm:text-5xl"
                            >
                                From an event to an <span className="text-lime">identity</span>
                            </motion.p>
                        ) : (
                            <motion.div
                                key="scroll"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-2 text-silver/90"
                            >
                                <span className="text-sm font-bold uppercase tracking-widest sm:text-base">
                                    Scroll to travel the decade
                                </span>
                                <svg
                                    className="h-6 w-6 motion-safe:animate-bounce"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden
                                >
                                    <path d="M12 5v14M5 12l7 7 7-7" />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.div
                    className="absolute inset-x-0 bottom-0 h-1.5 origin-left bg-lime"
                    style={{ scaleX: scrollYProgress }}
                    aria-hidden
                />
            </div>
        </section>
    );
}