"use client";
import { useState } from "react";
import type { Video } from "@/lib/about";

function embedUrl(v: Video, autoplay: boolean) {
    const url = new URL(
        v.playlistId
            ? "https://www.youtube-nocookie.com/embed/videoseries"
            : `https://www.youtube-nocookie.com/embed/${v.videoId}`
    );
    if (v.playlistId) url.searchParams.set("list", v.playlistId);
    url.searchParams.set("rel", "0");
    url.searchParams.set("modestbranding", "1");
    if (autoplay) url.searchParams.set("autoplay", "1");
    return url.toString();
}

export default function VideoShowcase({ videos }: { videos: Video[] }) {
    const [active, setActive] = useState(0);
    const [clicked, setClicked] = useState(false);

    if (!videos.length) {
        return (
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-pitch text-center text-silver/70">
                <p className="px-6">Videos from past editions are coming soon.</p>
            </div>
        );
    }

    const v = videos[active];

    return (
        <div>
            <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
                <iframe
                    key={active}
                    src={embedUrl(v, clicked)}
                    title={v.label}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                />
            </div>

            <p className="mt-4 font-display text-2xl font-extrabold uppercase text-lime sm:text-3xl">
                {v.label}
            </p>

            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a video">
                {videos.map((x, n) => (
                    <button
                        key={x.label}
                        type="button"
                        aria-pressed={n === active}
                        onClick={() => {
                            setActive(n);
                            setClicked(true);
                        }}
                        className={`rounded-full px-5 py-2.5 text-sm font-bold sm:text-base ${n === active
                                ? "bg-lime text-forest"
                                : "border border-white/30 hover:border-lime hover:text-lime"
                            }`}
                    >
                        {x.label}
                    </button>
                ))}
            </div>
        </div>
    );
}