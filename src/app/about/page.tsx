import Image from "next/image";
import Link from "next/link";
import AboutHero from "@/components/AboutHero";
import VideoShowcase from "@/components/VideoShowcase";
import MomentsCollage from "@/components/MomentsCollage";
import DualTicker from "@/components/DualTicker";
import { HERO_IMAGES, mediaUrl } from "@/lib/event";
import { CONVENER, MOMENT_IMAGES, VIDEOS } from "@/lib/about";

export const metadata = { title: "About | Hope Experience 10" };

export default function AboutPage() {
    const [firstBio, secondBio, ...moreBio] = CONVENER.bio;

    return (
        <main>
            <AboutHero images={HERO_IMAGES.map((f) => mediaUrl(`hero/${f}`))} />

            {/* What is Hope Experience */}
            <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-24 md:grid-cols-2">
                <h2 className="font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
                    What is <span className="text-lime">Hope Experience?</span>
                </h2>
                <div className="space-y-5 text-lg text-silver/85">
                    <p>
                        Hope Experience is an event where Jesus meets men. It is an atmosphere of pure praise
                        and worship that leaves you with an amazing encounter for life.
                    </p>
                    <p>
                        Now in its tenth year, the heart of Hope Experience has not changed. People come
                        together to worship, to pray and to be transformed by an encounter with Jesus.
                    </p>
                    <p>
                        This year, The Invaxion marks a decade of hope and transformation. It is free for
                        everyone, whatever your church or background.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {["10 years", "Free entry", "Worship. Prayer. Transformation."].map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-lime/40 px-4 py-2 text-sm font-bold text-lime"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Convener */}
            <section className="bg-pitch">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
                    <div className="mx-auto w-full max-w-sm md:max-w-none">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest shadow-[10px_10px_0_0_#4dff00]">
                            <Image
                                src={mediaUrl(CONVENER.photo)}
                                alt={CONVENER.name}
                                fill
                                sizes="(min-width: 768px) 420px, 90vw"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-lime">The convener</p>
                        <h2 className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
                            Meet {CONVENER.name}
                        </h2>
                        <p className="mt-5 text-xl text-silver">{CONVENER.intro}</p>
                        <p className="mt-4 text-lg text-silver/85">{firstBio}</p>
                        <p className="mt-4 text-lg text-silver/85">{secondBio}</p>

                        <details className="group mt-4">
                            <summary className="inline-flex h-11 cursor-pointer list-none items-center rounded-full border border-lime px-6 text-sm font-bold text-lime hover:bg-lime hover:text-forest group-open:hidden [&::-webkit-details-marker]:hidden">
                                Read full bio
                            </summary>
                            <div className="space-y-4 text-lg text-silver/85">
                                {moreBio.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                            </div>
                        </details>
                    </div>
                </div>
            </section>

            {/* Give and other ways to support */}
            <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
                <div className="rounded-3xl bg-lime p-8 text-forest sm:p-14">
                    <p className="text-sm font-bold uppercase tracking-widest">Give</p>
                    <h2 className="mt-2 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-7xl">
                        Partner with Hope Experience
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg">
                        Hope Experience is free for everyone. Your gift pays for the stage, the sound and the
                        outreach that put Jesus in front of more people.
                    </p>
                    <Link
                        href="/partner"
                        className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-forest px-10 text-lg font-bold text-lime hover:bg-pitch sm:w-auto"
                    >
                        Give now
                    </Link>
                </div>

                <p className="mt-10 text-sm font-bold uppercase tracking-widest text-silver/70">
                    Other ways to support
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                        href="/plan#volunteer"
                        className="inline-flex h-11 items-center rounded-full border border-lime px-6 text-sm font-bold text-lime hover:bg-lime hover:text-forest sm:text-base"
                    >
                        Volunteer
                    </Link>
                    <Link
                        href="/plan"
                        className="inline-flex h-11 items-center rounded-full border border-lime px-6 text-sm font-bold text-lime hover:bg-lime hover:text-forest sm:text-base"
                    >
                        Advertise the event
                    </Link>
                </div>
            </section>

            {/* Videos */}
            <section className="mx-auto max-w-5xl px-4 pb-16 sm:pb-24">
                <p className="text-sm font-bold uppercase tracking-widest text-lime">
                    Relive Hope Experience
                </p>
                <h2 className="mt-2 font-display text-5xl font-extrabold uppercase sm:text-7xl">
                    Memorable moments
                </h2>
                <div className="mt-8">
                    <VideoShowcase videos={VIDEOS} />
                </div>
            </section>

            <MomentsCollage images={MOMENT_IMAGES.map((f) => mediaUrl(`moments/${f}`))} />

            <DualTicker />
        </main>
    );
}