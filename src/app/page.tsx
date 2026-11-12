
import Link from "next/link";
import Countdown from "@/components/Countdown";
import HeroSlideshow from "@/components/HeroSlideshow";
import { EVENT, PRESET_AMOUNTS, HERO_IMAGES, mediaUrl } from "@/lib/event";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="spotlight relative overflow-hidden">
        <HeroSlideshow images={HERO_IMAGES.map((f) => mediaUrl(`hero/${f}`))} />
        <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 text-center">
          <h1 className="sr-only">Hope Experience 10, The Invaxion</h1>
          <p className="max-w-xl text-xl text-silver">
            {EVENT.tagline}. A night of worship, prayer and transformation.
          </p>
          <Countdown target={EVENT.dateISO} />
          <p className="font-display text-2xl text-gold sm:text-3xl">
            {EVENT.dateLabel}, {EVENT.timeLabel}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/partner"
              className="rounded-full bg-lime px-8 py-3 text-lg font-bold text-forest hover:bg-gold"
            >
              Partner with us
            </Link>
            <Link
              href="/plan"
              className="rounded-full border border-silver/40 px-8 py-3 text-lg hover:border-lime hover:text-lime"
            >
              Plan your experience
            </Link>
          </div>
        </div>
      </section>
      {/* Partnership band: the main call to action */}
      <section className="bg-lime text-forest">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-14 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">Help us reach one more life</h2>
            <p className="mt-3 max-w-md text-lg">
              Hope Experience is free for everyone. Your gift pays for the sound, the stage and
              the outreach that make it possible.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            {PRESET_AMOUNTS.map((a) => (
              <Link
                key={a}
                href={`/partner?amount=${a}`}
                className="rounded-full bg-forest px-6 py-3 font-bold text-lime hover:bg-pitch"
              >
                ₦{a.toLocaleString()}
              </Link>
            ))}
            <Link
              href="/partner"
              className="rounded-full border-2 border-forest px-6 py-3 font-bold"
            >
              Give another amount
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl text-silver sm:text-5xl">
          A decade of hope and transformation
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-silver/85">
          An atmosphere of pure praise and worship that leaves you with an amazing encounter for
          life. For ten years, Hope Experience has been the place where Jesus meets men.
        </p>
        <Link
          href="/journey"
          className="mt-6 inline-block text-lime underline underline-offset-4"
        >
          See our journey from 2016 to 2026
        </Link>
      </section>

      {/* Venue */}
      <section className="bg-pitch">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">Join us at the field</h2>
            <p className="mt-4 text-lg text-silver/85">
              {EVENT.venue}. {EVENT.address}.
            </p>
            <p className="mt-2 text-lg text-gold">
              {EVENT.dateLabel}, {EVENT.timeLabel}. Free entry.
            </p>
          </div>
          <div className="flex items-center md:justify-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                EVENT.venue + " Benin City"
              )}`}
              className="rounded-full bg-silver px-8 py-3 font-bold text-forest hover:bg-lime"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* Line up placeholder */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl text-silver sm:text-5xl">The line up</h2>
        <p className="mt-3 text-silver/80">
          Our ministers will be announced soon. Follow us on Instagram to see them first.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-lime/30 bg-pitch font-display text-3xl text-lime/60"
            >
              TBA
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}