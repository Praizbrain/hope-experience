import type { ReactNode } from "react";

function Icon() {
    return (
        <svg
            className="spin-slow h-8 w-8 shrink-0 text-lime sm:h-12 sm:w-12"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden
        >
            <path d="M8 8 40 40M40 8 8 40" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        </svg>
    );
}

function Row({
    children,
    direction,
    outline,
}: {
    children: ReactNode;
    direction: "left" | "right";
    outline?: boolean;
}) {
    const item = (k: number) => (
        <span key={k} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
            <span
                className={`whitespace-nowrap font-display text-[clamp(2.2rem,8vw,6.5rem)] font-extrabold uppercase leading-none ${outline ? "text-outline" : ""
                    }`}
            >
                {children}
            </span>
            <Icon />
        </span>
    );

    return (
        <div className="overflow-hidden">
            <div className={`flex w-max ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
                <div className="flex shrink-0">{[0, 1, 2, 3].map(item)}</div>
                <div className="flex shrink-0" aria-hidden>
                    {[4, 5, 6, 7].map(item)}
                </div>
            </div>
        </div>
    );
}

export default function DualTicker() {
    return (
        <section
            className="dots space-y-4 overflow-hidden border-y border-white/10 py-8 sm:space-y-6 sm:py-12"
            aria-label="An event where Jesus meets men. Worship, prayer, transformation."
        >
            <Row direction="left">
                An event where <span className="text-lime">Jesus meets men</span>
            </Row>
            <Row direction="right" outline>
                Worship. Prayer. Transformation.
            </Row>
        </section>
    );
}