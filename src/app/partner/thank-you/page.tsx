import Link from "next/link";

export const metadata = { title: "Thank you | Hope Experience 10" };

export default function ThankYou() {
    return (
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
            <h1 className="font-display text-5xl text-lime sm:text-6xl">
                Thank you for partnering with us
            </h1>
            <p className="mt-4 text-lg text-silver/85">
                Your gift is helping us reach more lives on 17 December. A receipt is on its way to your
                email.
            </p>
            <Link
                href="/"
                className="mt-8 inline-block rounded-full bg-lime px-8 py-3 font-bold text-forest"
            >
                Back to home
            </Link>
        </main>
    );
}