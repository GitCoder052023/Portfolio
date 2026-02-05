/**
 * Author Configuration
 * The philosophical identity behind this publication space
 * 
 * This is not a CV or a portfolio. This is the soul of the writings.
 */

// =============================================================================
// Author Identity
// =============================================================================

export const authorConfig = {
    // The writer
    name: 'Hamdan Khubaib',

    // The central philosophical commitment
    credo: 'To find truth, stop believing — start thinking.',

    // The extended philosophical statement
    philosophy: `The pursuit of truth begins not with answers, but with the courage to suspend belief. 
    I approach every question — whether in epistemology, consciousness, physics, or ethics — 
    from a position of genuine neutrality. Not the neutrality of indifference, but the neutrality 
    of honest inquiry: willing to follow the argument wherever it leads, even when it dismantles 
    what I thought I knew.`,

    // What drives the writing
    purpose: `This space exists for intellectual conversation. I write to document my thinking, 
    to expose ideas to scrutiny, and to invite disagreement. Every publication here is an 
    invitation — not to agree, but to think together. I want to hear your arguments, your 
    objections, your alternative perspectives. Truth is not found in isolation.`,

    // The nature of this space
    spaceDescription: `This is not a blog. This is not a portfolio. This is a public journal of 
    serious inquiry — a place where I publish formal writings, theories, research, and proposals 
    on the questions that resist easy answers. The writings here are meant to be engaged with, 
    challenged, and built upon.`,

    // Domains of inquiry
    domains: [
        {
            name: 'Epistemology & Logic',
            description: 'The foundations of knowledge, the nature of justification, and the structures of valid reasoning',
        },
        {
            name: 'Consciousness & Mind',
            description: 'The hard problem, phenomenal experience, and the relationship between mind and matter',
        },
        {
            name: 'Physics & Metaphysics',
            description: 'The fundamental nature of reality, time, causation, and existence itself',
        },
        {
            name: 'Computer Science & AI',
            description: 'Computation, intelligence, and the philosophical implications of artificial minds',
        },
        {
            name: 'Ethics & Power Dynamics',
            description: 'Moral truth, value, and the structures of power that shape human societies',
        },
        {
            name: 'Religion & Belief Systems',
            description: 'The nature of faith, religious epistemology, and the analysis of belief structures',
        },
    ],

    // The commitment to openness
    openAccessStatement: `Every piece of writing here is freely accessible. This is not generosity — 
    it is necessity. Ideas must circulate freely to be tested, refined, and corrected. 
    Knowledge that hides behind walls is knowledge that stagnates.`,

    // Invitation to engage
    invitation: `If you disagree with something I've written, I want to hear it. If you see a flaw 
    in my reasoning, point it out. If you have a better argument, make it. The purpose of 
    publishing is not to broadcast conclusions, but to begin conversations.`,

} as const;

// =============================================================================
// Philosophical Quotes (for use throughout the site)
// =============================================================================

export const philosophicalQuotes = [
    {
        text: 'To find truth, stop believing — start thinking.',
        attribution: null, // Original
    },
    {
        text: 'The only real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
        attribution: 'Marcel Proust',
    },
    {
        text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.',
        attribution: 'Aristotle',
    },
    {
        text: 'The unexamined life is not worth living.',
        attribution: 'Socrates',
    },
] as const;

// =============================================================================
// Type Exports
// =============================================================================

export type Domain = typeof authorConfig.domains[number];
