"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function AboutImages({ images }: { images: string[] }) {
    const [i, setI] = useState(0);

    useEffect(() => {
        if (images.length < 2) return;
        const id = setInterval(() => setI((n) => (n + 1) % images.length), 5000);
        return () => clearInterval(id);
    }, [images.length]);

    if (!images.length) return null;

    return (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-pitch">
            <AnimatePresence>
                <motion.div
                    key={images[i]}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                >
                    <Image
                        src={images[i]}
                        alt="Moments from Hope Experience"
                        fill
                        sizes="(min-width: 768px) 540px, 100vw"
                        className="object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-3 left-3 flex gap-2" aria-hidden>
                {images.map((_, n) => (
                    <span
                        key={n}
                        className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-lime" : "w-3 bg-white/60"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}