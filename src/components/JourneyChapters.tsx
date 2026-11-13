"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { mediaUrl } from "@/lib/event";
import { CHAPTERS } from "@/lib/journey";

function Photo({ src }: { src: string }) {
    const [bad, setBad] = useState(false);
    if (bad) return null;
    return (
        <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            onError={() => setBad(true)}
        />
    );
}

export default function JourneyChapters() {
    const ref = useRef<HTMLElement>(null);
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();
    const n = CHAPTERS.length;
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    useMotionValueEvent(scrollYProgress, "change", (p) => {
        setI(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1)))));
    });

    const go = (k: number) => {
        const el = ref.current;
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY + k * window.innerHeight;
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    };

    const c = CHAPTERS[i];

    return (
        <section ref={ref} style={{ height: `${n * 100}svh` }} aria-label="The journey in eight chapters">
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
                {/* Photos: black and white at the start, full colour by the end */}
                {CHAPTERS.map((ch, k) =>
                    Math.abs(k - i) <= 1 ? (
                        <div
                            key={ch.key}
                            aria-hidden
                            className="absolute inset-0 transition-opacity duration-700"
                            style={{ opacity: k === i ? 1 : 0 }}
                        >
                            <div
                                className={`absolute inset-0 transition-transform ease-linear ${reduce ? "" : "duration-[9000ms]"
                                    }`}
                                style={{
                                    filter: `grayscale(${1 - k / (n - 1)})`,
                                    transform: k === i && !reduce ? "scale(1.12)" : "scale(1.02)",
                                }}
                            >
                                <Photo src={mediaUrl(ch.image)} />
                            </div>
                        </div>
                    ) : null
                )}

                <div className="absolute inset-0 bg-moss/25 mix-blend-multiply" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/55" aria-hidden />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" aria-hidden />

                {/* Giant chapter number */}
                <AnimatePresence mode="wait">
                    <motion.p
                        key={i}
                        aria-hidden
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 0.55, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: 0.5 }}
                        className="text-outline absolute right-4 top-[11%] font-display text-[clamp(7rem,32vw,22rem)] font-extrabold leading-none md:right-14"
                    >
                        {String(i + 1).padStart(2, "0")}
                    </motion.p>
                </AnimatePresence>

                {/* Chapter text */}
                <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-7xl px-4 pb-20 md:pb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl"
                        >
                            <p className="text-sm font-bold uppercase tracking-widest text-lime">
                                Chapter {String(i + 1).padStart(2, "0")} of {String(n).padStart(2, "0")}
                            </p>
                            <h2 className="font-display text-[clamp(3.6rem,17vw,11rem)] font-extrabold uppercase leading-[0.85]">
                                {c.key}
                            </h2>
                            <p className="mt-3 font-display text-2xl font-extrabold uppercase leading-tight text-lime sm:text-4xl">
                                {c.question}
                            </p>
                            <p className="mt-4 max-w-xl text-base text-silver/90 sm:text-lg">{c.body}</p>
                            {c.quote && (
                                <blockquote className="mt-4 max-w-xl border-l-4 border-lime pl-4 text-lg italic text-silver">
                                    {c.quote}
                                </blockquote>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Chapter jumper */}
                <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2 md:inset-x-auto md:bottom-auto md:right-5 md:top-1/2 md:-translate-y-1/2 md:flex-col">
                    {CHAPTERS.map((ch, k) => (
                        <button
                            key={ch.key}
                            type="button"
                            onClick={() => go(k)}
                            aria-label={`Go to chapter ${k + 1}: ${ch.key}`}
                            aria-current={k === i}
                            className={`rounded-full transition-all ${k === i
                                    ? "h-1.5 w-10 bg-lime md:h-10 md:w-1.5"
                                    : "h-1.5 w-6 bg-white/40 hover:bg-white md:h-6 md:w-1.5"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}