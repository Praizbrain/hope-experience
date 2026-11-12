export const CONVENER = {
    name: "Pastor Nosa Grace",
    photo: "convener/pastor-nosa-grace.jpg",
    intro:
        "Pastor Nosa Grace is the Convener of Hope Experience, a divine encounter where Jesus meets men.",
    bio: [
        "He is the Founder and Lead Pastor of Healing Room Ministry, a fast-growing evangelical ministry with a mandate to revive Christ in the hearts of youths and raise a generation of global leaders and true worshippers.",
        "Under his leadership, Healing Room Ministry has grown beyond a single location and now has thriving branches in Benin City, Lagos State, and Abraka, Delta State, with many lives being transformed across these cities.",
        "He also serves as a Resident Pastor at God's Model Believers Chapel, where his sound doctrine and pastoral heart continue to impact lives.",
        "A graduate of Environmental Management and Toxicology (EMT) from the Federal University of Agriculture, Abeokuta (FUNAAB), Pastor Nosa Grace combines academic excellence with spiritual depth.",
        "He is a passionate music minister and a sound preacher of the Word, carrying a special grace to gather thousands of youths and young adults in every meeting. His messages ignite hearts, restore purpose, and raise men who will stand as global leaders for Christ.",
        "A lover of Jesus and a voice to his generation, his life and ministry remain a testament of God's grace and revival among young people.",
    ],
};

export const MOMENT_IMAGES = [
    "moment-1.jpg",
    "moment-2.jpg",
    "moment-3.jpg",
    "moment-4.jpg",
    "moment-5.jpg",
    "moment-6.jpg",
];

export type Video = { label: string; videoId?: string; playlistId?: string };

// Each entry becomes a button under the player.
// Use videoId for one video (the part after watch?v=) or playlistId for a playlist (the part after list=).
// Example: { label: "Open Heaven 2025", playlistId: "PASTE_PLAYLIST_ID_HERE" },
export const VIDEOS: Video[] = [
    { label: "Open Heaven 2025", videoId: "hBzuPwU4efw" },
];