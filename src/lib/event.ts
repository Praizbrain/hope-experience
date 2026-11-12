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

export const PRESET_AMOUNTS = [10000, 25000, 50000, 100000];
export const MIN_AMOUNT = 10000;

export const HERO_IMAGES = [
    "hero-1.jpg",
    "hero-2.jpg",
    "hero-3.jpg",
    "hero-4.jpg",
    "hero-5.jpg",
    "hero-6.jpg",
    "hero-7.jpg",
];

export const mediaUrl = (path: string) =>
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/event-media/${path}`;

export const ABOUT_IMAGES = ["about-1.jpg", "about-2.jpg", "about-3.jpg"];