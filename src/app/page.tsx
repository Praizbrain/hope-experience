import Link from "next/link";
import Hero from "@/components/Hero";
import TaglineBanner from "@/components/TaglineBanner";
import AboutImages from "@/components/AboutImages";
import Faq from "@/components/Faq";
import { EVENT, HERO_IMAGES, ABOUT_IMAGES, mediaUrl } from "@/lib/event";

export default function Home() {
  return (
    <main>
      <Hero images={HERO_IMAGES.map((f) => mediaUrl(`hero/${f}`))} />

      <TaglineBanner />

      {/* About */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">
            A decade of hope and transformation
          </h2>
          <p className="mt-4 text-lg text-silver/85">
            An atmosphere of pure praise and worship that leaves you with an amazing encounter
            for life. For ten years, Hope Experience has been the place where Jesus meets men.
          </p>
          <Link
            href="/journey"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-lime px-6 py-3 text-base font-bold text-lime transition hover:bg-lime hover:text-forest sm:w-auto sm:px-8 sm:text-lg"
          >
            Our journey, 2016 to 2026
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <AboutImages images={ABOUT_IMAGES.map((f) => mediaUrl(`about/${f}`))} />
      </section>
      {/* Venue */}
      <section className="bg-pitch">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-extrabold uppercase sm:text-6xl">
              Join us at the field
            </h2>
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
              className="w-full rounded-full bg-silver px-8 py-3 text-center text-base font-bold text-forest hover:bg-lime sm:w-auto sm:text-lg"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* Line up placeholder */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <h2 className="font-display text-4xl font-extrabold uppercase sm:text-6xl">The line up</h2>
        <p className="mt-3 text-silver/80">
          Our ministers will be announced soon. Follow us on Instagram to see them first.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-[3/4] items-center justify-center rounded-2xl border border-lime/30 bg-pitch font-display text-3xl font-extrabold text-lime/60"
            >
              TBA
            </div>
          ))}
        </div>
      </section>

      <Faq />
    </main>
  );
}