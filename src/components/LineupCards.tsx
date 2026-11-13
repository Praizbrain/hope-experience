"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { mediaUrl } from "@/lib/event";

export type Minister = { name: string; photo: string };

const enter = (i: number) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, delay: (i % 4) * 0.1 },
});

function Mystery({ i }: { i: number }) {
    const reduce = useReducedMotion();
    return (
        <motion.li
            {...enter(i)}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-lime/30 bg-pitch"
        >
            {/* Green light behind the figure */}
            <div className="absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_28%,rgba(77,255,0,0.4),transparent_72%)]" />

            {/* Shadow silhouette */}
            <svg
                viewBox="0 0 200 260"
                preserveAspectRatio="xMidYMax meet"
                className="absolute inset-x-0 bottom-0 h-[92%] w-full drop-shadow-[0_0_18px_rgba(77,255,0,0.25)]"
                aria-hidden
            >
                <circle cx="100" cy="88" r="44" fill="#030303" stroke="rgba(77,255,0,0.35)" strokeWidth="1.5" />
                <path
                    d="M14 260C14 196 52 160 100 160s86 36 86 100Z"
                    fill="#030303"
                    stroke="rgba(77,255,0,0.35)"
                    strokeWidth="1.5"
                />
            </svg>

            {/* Fade into black at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* The question mark */}
            <motion.span
                aria-hidden
                className="absolute inset-x-0 top-[17%] block text-center font-display text-[6.5rem] font-extrabold leading-none text-lime [text-shadow:0_0_28px_rgba(77,255,0,0.85)] sm:text-[8.5rem]"
                animate={reduce ? undefined : { opacity: [1, 0.55, 1], y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
                ?
            </motion.span>

            <p className="absolute inset-x-0 bottom-4 text-center text-xs font-bold uppercase tracking-widest text-silver/80 sm:text-sm">
                Announcing soon
            </p>
        </motion.li>
    );
}

function Revealed({ m, i }: { m: Minister; i: number }) {
    return (
        <motion.li
            {...enter(i)}
            className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-lime/40 bg-pitch"
        >
            <Image
                src={mediaUrl(m.photo)}
                alt={m.name}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <p className="absolute inset-x-0 bottom-4 px-3 text-center font-display text-2xl font-extrabold uppercase">
                {m.name}
            </p>
        </motion.li>
    );
}

export default function LineupCards({
    ministers,
    slots = 4,
}: {
    ministers: Minister[];
    slots?: number;
}) {
    const mystery = Math.max(0, slots - ministers.length);
    return (
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {ministers.map((m, i) => (
                <Revealed key={m.name} m={m} i={i} />
            ))}
            {Array.from({ length: mystery }).map((_, k) => (
                <Mystery key={k} i={ministers.length + k} />
            ))}
        </ul>
    );
}