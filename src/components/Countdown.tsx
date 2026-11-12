"use client";
import { useEffect, useState } from "react";

function parts(target: number) {
    const diff = Math.max(0, target - Date.now());
    return {
        Days: Math.floor(diff / 86400000),
        Hours: Math.floor((diff / 3600000) % 24),
        Minutes: Math.floor((diff / 60000) % 60),
        Seconds: Math.floor((diff / 1000) % 60),
    };
}

export default function Countdown({ target }: { target: string }) {
    const t = new Date(target).getTime();
    const [v, setV] = useState<ReturnType<typeof parts> | null>(null);

    useEffect(() => {
        setV(parts(t));
        const id = setInterval(() => setV(parts(t)), 1000);
        return () => clearInterval(id);
    }, [t]);

    return (
        <div className="flex gap-3 sm:gap-6" role="timer" aria-label="Time until the event">
            {(["Days", "Hours", "Minutes", "Seconds"] as const).map((k) => (
                <div key={k} className="min-w-[4.2rem] text-center sm:min-w-[7rem]">
                    <div className="font-display text-5xl leading-none text-lime tabular-nums sm:text-8xl">
                        {v ? String(v[k]).padStart(2, "0") : "--"}
                    </div>
                    <div className="mt-1 text-xs text-silver/70 sm:text-sm">{k}</div>
                </div>
            ))}
        </div>
    );
}