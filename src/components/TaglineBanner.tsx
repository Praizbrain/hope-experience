"use client";
import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";

const SPEED = 140; // pixels per second: higher is faster
const PAUSE = 2; // seconds to rest before moving again

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function Phrase() {
    return (
        <span className="flex shrink-0 items-center gap-5 pr-5 sm:gap-10 sm:pr-10">
            <span className="font-display whitespace-nowrap text-[clamp(1.9rem,7vw,5.5rem)] font-extrabold uppercase leading-none">
                An event where <span className="text-lime">Jesus meets men</span>
            </span>
            <span className="h-3 w-3 shrink-0 rounded-full bg-gold sm:h-4 sm:w-4" aria-hidden />
        </span>
    );
}

export default function TaglineBanner() {
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const first = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (reduce) return;
        let stopped = false;
        let controls: ReturnType<typeof animate> | undefined;

        (async () => {
            while (!stopped) {
                const w = first.current?.offsetWidth ?? 0;
                if (!w) {
                    await sleep(200);
                    continue;
                }
                x.set(0);
                controls = animate(x, -w, { duration: w / SPEED, ease: "linear" });
                await controls;
                if (stopped) break;
                await sleep(PAUSE * 1000);
            }
        })();

        return () => {
            stopped = true;
            controls?.stop();
        };
    }, [reduce, x]);

    return (
        <section
            className="dots overflow-hidden border-y border-white/10 py-8 sm:py-12"
            aria-label="An event where Jesus meets men"
        >
            {reduce ? (
                <div className="flex justify-center">
                    <Phrase />
                </div>
            ) : (
                <motion.div style={{ x }} className="flex w-max">
                    <div ref={first} className="shrink-0">
                        <Phrase />
                    </div>
                    <Phrase />
                    <Phrase />
                    <Phrase />
                </motion.div>
            )}
        </section>
    );
}