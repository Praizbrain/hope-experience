import PartnerForm from "./PartnerForm";

export const metadata = { title: "Partner with us | Hope Experience 10" };

export default async function PartnerPage({
    searchParams,
}: {
    searchParams: Promise<{ amount?: string }>;
}) {
    const { amount } = await searchParams;
    const initial = Number(amount) > 0 ? Number(amount) : undefined;

    return (
        <main className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
            <div>
                <h1 className="font-display text-5xl text-silver sm:text-6xl">
                    Partner with Hope Experience
                </h1>
                <p className="mt-4 text-lg text-silver/85">
                    Hope Experience is free for everyone who comes. Your gift covers the stage, sound,
                    logistics and outreach that make the night happen.
                </p>
                <p className="mt-4 text-silver/70">
                    Every gift goes directly to the work. You will receive a Paystack receipt by email.
                </p>
            </div>
            <div className="rounded-3xl bg-pitch p-6 sm:p-8">
                <PartnerForm initialAmount={initial} />
            </div>
        </main>
    );
}