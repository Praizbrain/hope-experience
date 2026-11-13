"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
    videoId?: string;
    playlistId?: string;
    label: string;
    title: string;
    poster?: string;
    autoPlay?: boolean;
    className?: string;
};

function embedSrc(videoId?: string, playlistId?: string) {
    const url = new URL(
        playlistId
            ? "https://www.youtube-nocookie.com/embed/videoseries"
            : `https://www.youtube-nocookie.com/embed/${videoId}`
    );
    if (playlistId) url.searchParams.set("list", playlistId);
    url.searchParams.set("autoplay", "1");
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    url.searchParams.set("playsinline", "1");
    return url.toString();
}

export default function FeaturedVideo({
    videoId,
    playlistId,
    label,
    title,
    poster,
    autoPlay = false,
    className = "sm:rounded-3xl sm:border sm:border-lime/30 sm:shadow-[0_0_90px_-20px_rgba(77,255,0,0.5)]",
}: Props) {
    const [playing, setPlaying] = useState(autoPlay);
    const [broken, setBroken] = useState(false);
    const reduce = useReducedMotion();

    return (
        <div className={`relative aspect-video w-full overflow-hidden bg-black ${className}`}>
            {playing ? (
                <iframe
                    src={embedSrc(videoId, playlistId)}
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
                                unoptimized={poster.startsWith("https://i.ytimg.com")}
                                className="object-cover"
                                onError={() => setBroken(true)}
                            />
                        </motion.div>
                    )}

                    {/* Cinematic grade: green wash, light glow, dark edges */}
                    <div className="absolute inset-0 bg-moss/45 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_15%,rgba(77,255,0,0.35),transparent_70%)] mix-blend-screen" />
                    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,rgba(0,0,0,0.8))]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                    {/* Letterbox bars */}
                    <div className="absolute inset-x-0 top-0 h-[6%] bg-black" />
                    <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black" />

                    {/* Play button */}
                    <span className="absolute inset-0 flex items-center justify-center">
                        <span className="relative flex h-16 w-16 items-center justify-center sm:h-28 sm:w-28">
                            <span className="absolute inset-0 rounded-full bg-lime/40 motion-safe:animate-ping" />
                            <span className="relative flex h-full w-full items-center justify-center rounded-full bg-lime text-forest shadow-2xl transition group-hover:scale-110 group-hover:bg-gold">
                                <svg
                                    className="ml-1 h-7 w-7 sm:h-12 sm:w-12"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden
                                >
                                    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
                                </svg>
                            </span>
                        </span>
                    </span>

                    {/* Caption: title only on phones, full caption on larger screens */}
                    <span className="absolute bottom-[9%] left-4 right-4 sm:bottom-[10%] sm:left-8">
                        <span className="hidden text-sm font-bold uppercase tracking-widest text-lime sm:block">
                            {label}
                        </span>
                        <span className="block font-display text-2xl font-extrabold uppercase leading-none sm:mt-1 sm:text-6xl">
                            {title}
                        </span>
                        <span className="mt-2 hidden rounded-full bg-black/60 px-3 py-1 text-sm font-bold sm:inline-block">
                            Watch the full video
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}