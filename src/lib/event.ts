export const EVENT = {
    name: "Hope Experience 10",
    theme: "The Invaxion",
    tagline: "An event where Jesus meets men",
    dateISO: "2026-12-17T20:00:00+01:00",
    dateLabel: "Thursday, 17 December 2026",
    timeLabel: "8PM",
    venue: "Ugbekun Primary School Field",
    address:
        "Opposite Jesus Christ junction, Upper Sakponba Road, Benin City, Edo State",
    enquiries: ["07026696064", "09121986405"],
    socials: {
        instagram: "https://www.instagram.com/hope_experience",
        tiktok: "https://www.tiktok.com/@hopeexperience",
        facebook: "https://www.facebook.com/share/1B6ofTEFrF/",
    },
};

export const PRESET_AMOUNTS = [5000, 10000, 50000, 100000];
export const MIN_AMOUNT = 1000;

export const HERO_IMAGES = ["hero-1.jpg", "hero-2.jpg", "hero-3.jpg"];

export const mediaUrl = (path: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-media/${path}`;