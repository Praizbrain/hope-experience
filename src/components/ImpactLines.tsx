"use client";
import { motion } from "framer-motion";
import { IMPACT_LINES } from "@/lib/journey";

export default function ImpactLines() {
    return (
        <section className="dots overflow-hidden border-y border-white/10 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-4">
                <p className="text-sm font-bold uppercase tracking-widest text-lime">The Hope Series</p>
                <h2 className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
                    One story. <span className="text-lime">Countless others.</span>
                </h2>

                <ul className="mt-12 space-y-3 sm:space-y-6">
                    {IMPACT_LINES.map((line, k) => {
                        const last = k === IMPACT_LINES.length - 1;
                        return (
                            <motion.li
                                key={line}
                                initial={{ opacity: 0, x: k % 2 === 0 ? -140 : 140 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ type: "spring", stiffness: 70, damping: 16 }}
                                className={`font-display text-[clamp(1.9rem,7.5vw,5.5rem)] font-extrabold uppercase leading-none ${k % 2 === 0 ? "text-left" : "text-right"
                                    } ${last ? "text-lime" : k % 2 === 0 ? "text-silver" : "text-outline"}`}
                            >
                                {line}
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}