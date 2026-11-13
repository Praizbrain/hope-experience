"use client";
import { useState } from "react";
import FeaturedVideo from "@/components/FeaturedVideo";
import { mediaUrl } from "@/lib/event";
import type { Video } from "@/lib/about";

function posterFor(v: Video) {
    if (v.poster) return mediaUrl(v.poster);
    if (v.videoId) return `https://i.ytimg.com/vi/${v.videoId}/maxresdefault.jpg`;
    return undefined;
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
            <FeaturedVideo
                key={active}
                videoId={v.videoId}
                playlistId={v.playlistId}
                label="Relive Hope Experience"
                title={v.label}
                poster={posterFor(v)}
                autoPlay={clicked}
                className="rounded-2xl border border-lime/30 shadow-[0_0_70px_-25px_rgba(77,255,0,0.5)]"
            />

            <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Choose a video">
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