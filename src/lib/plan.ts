export const WORKFORCE_URL = "https://hopeexperience10.vercel.app";

// Add more flyers here and each one gets its own download button.
export const FLYERS = [
    {
        label: "Download the flyer",
        file: "/flyers/hope-experience-10-flyer.jpg",
        name: "Hope-Experience-10-Flyer.jpg",
    },
];

export const CHOIR = { name: "Angela", phone: "07051925164" };

export type Bus = {
    location: string;
    contacts: { name: string; phone: string }[];
};

export const BUSES: Bus[] = [
    { location: "3 House Junction", contacts: [{ name: "Queen", phone: "07048018587" }] },
    { location: "Idogbo (Y Junction)", contacts: [{ name: "Pst Aise", phone: "09017179210" }] },
    {
        location: "Ugbowo (Uniben)",
        contacts: [
            { name: "Osayamen", phone: "09076876014" },
            { name: "Blessed", phone: "09138695059" },
        ],
    },
    { location: "Goretti Junction", contacts: [{ name: "Isoken", phone: "07031106749" }] },
    { location: "Ekhewuan (Uniben)", contacts: [{ name: "Maris", phone: "08115378032" }] },
    { location: "Egor Market", contacts: [{ name: "Mr Uyi", phone: "07010661961" }] },
    { location: "Ekpoma (AAU)", contacts: [{ name: "Gift", phone: "09077631236" }] },
    { location: "Ramat Park", contacts: [{ name: "Precious Ada", phone: "09038198245" }] },
    { location: "Usen & Okada", contacts: [{ name: "Pst Godsword", phone: "09038827509" }] },
];

// 07048018587 becomes 2347048018587
const intl = (phone: string) => "234" + phone.replace(/\D/g, "").replace(/^0/, "");

export const callHref = (phone: string) => `tel:+${intl(phone)}`;

export const whatsappHref = (phone: string, text?: string) =>
    `https://wa.me/${intl(phone)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const WORKFORCE_WHATSAPP =
    "https://chat.whatsapp.com/I9CuoVC8TRr4JGn8npIZXx?s=cl&p=i&mlu=4&ilr=4";

export const TEAMS = [
    "Media and photography",
    "Content creation",
    "Ushering",
    "Choir and music",
    "Technical and sound",
    "Logistics and transport",
    "Protocol unit",
    "Greeters & Hospitality",
    "logistics",
];