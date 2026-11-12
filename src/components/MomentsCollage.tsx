"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    type MotionValue,
} from "framer-motion";

const TILT = [-3, 2.5, -2, 3, -2.5, 2];
const SHAPES = [
    "aspect-[4/5]",
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[5/4]",
    "aspect-[4/5]",
    "aspect-[3/4]",
];

function Photo({ src, i }: { src: string; i: number }) {
    const tilt = TILT[i % TILT.length];
    return (
        <motion.figure
            initial={{ opacity: 0, y: 80, rotate: tilt * 3, scale: 0.88 }}
            whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: (i % 3) * 0.08 }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 20 }}
            className={`relative overflow-hidden rounded-xl border-4 border-white/90 shadow-2xl shadow-black/60 ${SHAPES[i % SHAPES.length]
                }`}
        >
            <Image
                src={src}
                alt="A moment from Hope Experience"
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
            />
        </motion.figure>
    );
}

function Cols({
    images,
    count,
    progress,
}: {
    images: string[];
    count: number;
    progress: MotionValue<number>;
}) {
    const reduce = useReducedMotion();
    const up = useTransform(progress, [0, 1], reduce ? [0, 0] : [40, -80]);
    const down = useTransform(progress, [0, 1], reduce ? [0, 0] : [-60, 60]);
    const cols = Array.from({ length: count }, (_, c) =>
        images.map((src, i) => ({ src, i })).filter(({ i }) => i % count === c)
    );

    return (
        <div className={`grid gap-4 sm:gap-6 ${count === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {cols.map((col, c) => (
                <motion.div
                    key={c}
                    style={{ y: c % 2 === 0 ? up : down }}
                    className="flex flex-col gap-4 sm:gap-6"
                >
                    {col.map(({ src, i }) => (
                        <Photo key={src} src={src} i={i} />
                    ))}
                </motion.div>
            ))}
        </div>
    );
}

export default function MomentsCollage({ images }: { images: string[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    return (
        <section className="overflow-hidden bg-pitch">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
                <h2 className="font-display text-5xl font-extrabold uppercase sm:text-7xl">
                    Caught in the <span className="text-lime">moment</span>
                </h2>

                {images.length > 0 && (
                    <div ref={ref} className="mt-12 pb-16">
                        <div className="md:hidden">
                            <Cols images={images} count={2} progress={scrollYProgress} />
                        </div>
                        <div className="hidden md:block">
                            <Cols images={images} count={3} progress={scrollYProgress} />
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        href="/gallery"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-8 text-base font-bold text-forest hover:bg-gold sm:text-lg"
                    >
                        Explore the gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}