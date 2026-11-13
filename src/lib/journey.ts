export const START_YEAR = 2016;
export const END_YEAR = 2026;

export const MANIFESTO =
    "For ten years, Hope Experience has been a space where young people and adults come together to encounter Jesus. We have experienced hope. We have seen lives changed. But these stories have not always been told. So the next chapter is not another event. It is an identity.";

export const MANIFESTO_HIGHLIGHT = ["jesus", "identity"];

export type Chapter = {
    key: string;
    question: string;
    body: string;
    image: string; // path inside the event-media bucket
    // Add Pastor Nosa's own words here once the interview is recorded.
    quote?: string;
};

export const CHAPTERS: Chapter[] = [
    {
        key: "Before",
        question: "Who were you?",
        body: "Behind every Hope Experience is a person, and a story that has not been told well enough. It starts here.",
        image: "journey/before.jpg",
    },
    {
        key: "Encounter",
        question: "What changed?",
        body: "An encounter with God that changed his direction. Everything that followed began in this moment.",
        image: "journey/encounter.jpg",
    },
    {
        key: "Conviction",
        question: "Why did you believe you had to do something?",
        body: "A young man became convinced that God had called him to reach his generation. The question is not how Hope Experience became what it is. It is why it had to exist at all.",
        image: "journey/conviction.jpg",
    },
    {
        key: "Sacrifice",
        question: "What were you willing to give?",
        body: "Every conviction has a cost. This chapter is about what it took to say yes.",
        image: "journey/sacrifice.jpg",
    },
    {
        key: "Journey",
        question: "How did Hope Experience shape you?",
        body: "Ten years of building a space where young people and adults come together to encounter Jesus. The people who build it are shaped by it too.",
        image: "journey/journey.jpg",
    },
    {
        key: "Impact",
        question: "What have you seen happen to people?",
        body: "We have seen lives changed. We have watched people encounter Jesus. We have seen people discover direction, purpose and calling.",
        image: "journey/impact.jpg",
    },
    {
        key: "Now",
        question: "What does Hope Experience mean after 10 years?",
        body: "More than an event. An identity. A place where Jesus meets men, and something happens.",
        image: "journey/now.jpg",
    },
    {
        key: "Future",
        question: "What are you still believing for?",
        body: "The story is not over. The ten-year film is the beginning, not the end. Your story belongs in it too.",
        image: "journey/future.jpg",
    },
];

export const IMPACT_LINES = [
    "People who came with questions.",
    "People who encountered Jesus.",
    "People who came broken.",
    "People whose decisions changed.",
    "People who discovered purpose.",
    "People who are now impacting others.",
];