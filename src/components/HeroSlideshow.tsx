"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function HeroSlideshow({ images }: { images: string[] }) {
    const [i, setI] = useState(0);
    const reduce = useReducedMotion();

    useEffect(() => {
        if (images.length < 2) return;
        const id = setInterval(() => setI((n) => (n + 1) % images.length), 6000);
        return () => clearInterval(id);
    }, [images.length]);

    if (!images.length) return null;

    return (
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
            <AnimatePresence>
                <motion.div
                    key={images[i]}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6 }}
                >
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: reduce ? 1.05 : 1.18 }}
                        transition={{ duration: 8, ease: "linear" }}
                    >
                        <Image
                            src={images[i]}
                            alt=""
                            fill
                            priority={i === 0}
                            sizes="100vw"
                            className="object-cover blur-[2px]"
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-pitch/60 to-forest" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,transparent,rgba(6,38,15,.75))]" />
        </div>
    );
}