"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const HIDDEN = "polygon(0% 0%, 0% 0%, -25% 100%, -25% 100%)";
const SHOWN = "polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)";

export default function AboutHero({ images }: { images: string[] }) {
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();
    const n = images.length;

    useEffect(() => {
        if (n < 2) return;
        const id = setInterval(() => setI((v) => (v + 1) % n), 5000);
        return () => clearInterval(id);
    }, [n]);

    const prev = n ? (i - 1 + n) % n : 0;

    return (
        <section className="relative isolate overflow-hidden bg-forest">
            <div className="relative h-[88svh] min-h-[32rem]">
                {n > 0 && (
                    <>
                        <div className="absolute inset-0" aria-hidden>
                            <Image src={images[prev]} alt="" fill sizes="100vw" className="object-cover" />
                        </div>
                        <motion.div
                            key={i}
                            className="absolute inset-0"
                            aria-hidden
                            initial={{ clipPath: reduce ? SHOWN : HIDDEN }}
                            animate={{ clipPath: SHOWN }}
                            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                        >
                            <Image
                                src={images[i]}
                                alt=""
                                fill
                                priority={i === 0}
                                sizes="100vw"
                                className="object-cover"
                            />
                        </motion.div>
                    </>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-forest/40" />

                {/* Tilted tape */}
                <div
                    className="absolute -left-6 -right-6 top-[16%] z-10 -rotate-3 overflow-hidden bg-lime py-2 text-forest shadow-xl"
                    aria-hidden
                >
                    <div className="marquee-left flex w-max" style={{ animationDuration: "22s" }}>
                        {[0, 1].map((half) => (
                            <div key={half} className="flex shrink-0">
                                {Array.from({ length: 8 }).map((_, k) => (
                                    <span
                                        key={k}
                                        className="shrink-0 whitespace-nowrap pr-8 font-display text-lg font-extrabold uppercase sm:text-2xl"
                                    >
                                        10 years • one name • Jesus •
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}