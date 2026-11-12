import Link from "next/link";
import { EVENT } from "@/lib/event";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-forest">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
                <div>
                    <Image
                        src="/brand/logo-lockup.png"
                        alt="The Invaxion, Hope Experience 10"
                        width={900}
                        height={400}
                        className="h-20 w-auto mix-blend-screen"
                    />
                    <p className="mt-2 text-silver/70">
                        {EVENT.theme}. {EVENT.tagline}.
                    </p>
                </div>
                <div className="text-silver/80">
                    <p>{EVENT.venue}</p>
                    <p className="text-silver/60">{EVENT.address}</p>
                    <p className="mt-2">Enquiries: {EVENT.enquiries.join(", ")}</p>
                </div>
                <div className="flex flex-col items-start gap-2 text-silver/80">
                    <a href={EVENT.socials.instagram} className="hover:text-lime">Instagram</a>
                    <a href={EVENT.socials.tiktok} className="hover:text-lime">TikTok</a>
                    <a href={EVENT.socials.facebook} className="hover:text-lime">Facebook</a>
                    <Link
                        href="/partner"
                        className="mt-2 rounded-full bg-lime px-5 py-2 text-sm font-bold text-forest"
                    >
                        Partner with us
                    </Link>
                </div>
            </div>
        </footer>
    );
}