"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({
    word,
    range,
    progress,
    lit,
}: {
    word: string;
    range: [number, number];
    progress: MotionValue<number>;
    lit: boolean;
}) {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span style={{ opacity }} className={`mr-[0.25em] inline-block ${lit ? "text-lime" : ""}`}>
            {word}
        </motion.span>
    );
}

export default function WordReveal({
    text,
    highlight = [],
    className = "",
}: {
    text: string;
    highlight?: string[];
    className?: string;
}) {
    const ref = useRef<HTMLParagraphElement>(null);
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
    const words = text.split(" ");

    if (reduce) return <p className={className}>{text}</p>;

    return (
        <p ref={ref} className={className}>
            {words.map((w, i) => (
                <Word
                    key={i}
                    word={w}
                    range={[i / words.length, (i + 1) / words.length]}
                    progress={scrollYProgress}
                    lit={highlight.includes(w.toLowerCase().replace(/[^a-z]/g, ""))}
                />
            ))}
        </p>
    );
}