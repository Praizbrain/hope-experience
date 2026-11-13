import Link from "next/link";
import Countdown from "@/components/Countdown";
import { EVENT } from "@/lib/event";

export default function NotFound() {
    return (
        <main className="dots relative isolate overflow-hidden">
            <div
                className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_30%,rgba(77,255,0,0.18),transparent_70%)]"
                aria-hidden
            />

            <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-lime">Error 404</p>

                <p
                    aria-hidden
                    className="text-outline font-display text-[clamp(7rem,32vw,16rem)] font-extrabold leading-[0.85]"
                >
                    404
                </p>

                <h1 className="mt-4 font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
                    This page is still <span className="text-lime">on its way</span>
                </h1>

                <p className="mt-4 max-w-md text-lg text-silver/85">
                    The page you are looking for is not here yet, but the experience is. We will see you on{" "}
                    {EVENT.dateLabel.replace("Thursday, ", "")}.
                </p>

                <div className="mt-8 flex justify-center">
                    <Countdown target={EVENT.dateISO} />
                </div>

                <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-lime px-8 text-base font-bold text-forest hover:bg-gold sm:text-lg"
                    >
                        Back to home
                    </Link>
                    <Link
                        href="/plan"
                        className="inline-flex h-12 items-center justify-center rounded-full border border-lime px-8 text-base font-bold text-lime hover:bg-lime hover:text-forest sm:text-lg"
                    >
                        Plan your experience
                    </Link>
                </div>
            </div>
        </main>
    );
}