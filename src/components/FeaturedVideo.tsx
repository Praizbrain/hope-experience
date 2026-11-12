"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
    videoId: string;
    label: string;
    title: string;
    poster?: string;
};

export default function FeaturedVideo({ videoId, label, title, poster }: Props) {
    const [playing, setPlaying] = useState(false);
    const [broken, setBroken] = useState(false);
    const reduce = useReducedMotion();

    return (
        <div className="relative aspect-video w-full overflow-hidden bg-black sm:rounded-3xl sm:border sm:border-lime/30 sm:shadow-[0_0_90px_-20px_rgba(77,255,0,0.5)]">
            {playing ? (
                <iframe
                    src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title={`${title}, ${label}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label={`Play video: ${title}, ${label}`}
                    className="group absolute inset-0 block w-full text-left"
                >
                    {/* Base colour, shows if there is no photo */}
                    <div className="absolute inset-0 bg-gradient-to-br from-moss via-pitch to-forest" />

                    {poster && !broken && (
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 1.05 }}
                            animate={{ scale: reduce ? 1.05 : 1.15 }}
                            transition={{ duration: 14, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                        >
                            <Image
                                src={poster}
                                alt=""
                                fill
                                sizes="(min-width: 1152px) 1152px, 100vw"
                                className="object-cover"
                                onError={() => setBroken(true)}
                            />
                        </motion.div>
                    )}

                    {/* Cinematic grade: green wash, light glow, dark edges */}
                    <div className="absolute inset-0 bg-moss/45 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_15%,rgba(77,255,0,0.35),transparent_70%)] mix-blend-screen" />
                    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,rgba(0,0,0,0.8))]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Letterbox bars */}
                    <div className="absolute inset-x-0 top-0 h-[6%] bg-black" />
                    <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />

                    {/* Play button */}
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="relative flex h-20 w-20 items-center justify-center sm:h-28 sm:w-28">
                            <span className="absolute inset-0 rounded-full bg-lime/40 motion-safe:animate-ping" />
                            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-lime text-forest shadow-2xl transition group-hover:scale-110 group-hover:bg-gold">
                                <svg
                                    className="ml-1 h-8 w-8 sm:h-12 sm:w-12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden
                                >
                                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
                                </svg>
                            </span>
                        </span>
                    </span>

                    {/* Caption */}
                    <span className="absolute bottom-[9%] left-4 right-4 sm:bottom-[10%] sm:left-8">
                        <span className="block text-xs font-bold uppercase tracking-widest text-lime sm:text-sm">
                            {label}
                        </span>
                        <span className="mt-1 block font-display text-3xl font-extrabold uppercase leading-none sm:text-6xl">
                            {title}
                        </span>
                        <span className="mt-2 inline-block rounded-full bg-black/60 px-3 py-1 text-xs font-bold sm:text-sm">
                            Watch the full video
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}