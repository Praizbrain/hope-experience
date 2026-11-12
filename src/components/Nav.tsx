"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/line-up", label: "The Line Up" },
    { href: "/plan", label: "Plan Your Experience" },
    { href: "/journey", label: "Our Journey" },
    { href: "/gallery", label: "Gallery" },
];

export default function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-forest/90 backdrop-blur">
            <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2">
                <Link href="/" aria-label="Hope Experience 10 home" onClick={() => setOpen(false)}>
                    <Image
                        src="/brand/logo-lockup.png"
                        alt="The Invaxion, Hope Experience 10"
                        width={900}
                        height={400}
                        priority
                        className="h-12 w-auto mix-blend-screen"
                    />
                </Link>

                <ul className="hidden items-center gap-6 text-sm md:flex">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link href={l.href} className="text-silver/80 hover:text-lime">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-3">
                    <Link
                        href="/partner"
                        className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-forest hover:bg-gold sm:px-5"
                    >
                        Partner with us
                    </Link>
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 md:hidden"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            {open ? (
                                <path d="M6 6l12 12M18 6L6 18" />
                            ) : (
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <ul className="border-t border-white/10 bg-forest px-4 pb-4 md:hidden">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="block border-b border-white/10 py-3 text-lg text-silver hover:text-lime"
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    );
}