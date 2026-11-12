"use client";
import { motion, useReducedMotion } from "framer-motion";

const IN = 1.2; // seconds sliding in
const HOLD = 5; // seconds holding still
const OUT = 1.2; // seconds sliding out
const TOTAL = IN + HOLD + OUT;

export default function TaglineBanner() {
    const reduce = useReducedMotion();

    const text = (
        <span className="font-display whitespace-nowrap text-[clamp(1.7rem,6.4vw,5.5rem)] font-extrabold uppercase leading-none">
            An event where <span className="text-lime">Jesus meets men</span>
        </span>
    );

    return (
        <section
            className="dots relative overflow-hidden border-y border-white/10 py-10 sm:py-14"
            aria-label="An event where Jesus meets men"
        >
            {reduce ? (
                <div className="text-center">{text}</div>
            ) : (
                <motion.div
                    className="flex justify-center"
                    animate={{ x: ["110%", "0%", "0%", "-110%"] }}
                    transition={{
                        duration: TOTAL,
                        times: [0, IN / TOTAL, (IN + HOLD) / TOTAL, 1],
                        ease: ["easeOut", "linear", "easeIn"],
                        repeat: Infinity,
                    }}
                >
                    {text}
                </motion.div>
            )}
        </section>
    );
}