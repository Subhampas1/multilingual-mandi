// Simulated translation for demonstration
// In production, integrate with Google Translate API or similar

const SAMPLE_TRANSLATIONS = {
    'Hello': {
        hi: 'नमस्ते',
        ta: 'வணக்கம்',
        bn: 'হ্যালো',
        te: 'హలో',
        mr: 'नमस्कार',
        gu: 'નમસ્તે',
    },
    'What is your final price?': {
        hi: 'आपकी अंतिम कीमत क्या है?',
        ta: 'உங்கள் இறுதி விலை என்ன?',
        bn: 'আপনার চূড্ডান্ত মূল্য কি?',
        te: 'మీ చివరి ధర ఏమిటి?',
        mr: 'तुमची अंतिम किंमत काय आहे?',
        gu: 'તમારી અંતિમ કિંમત શું છે?',
    },
    'I can offer': {
        hi: 'मैं दे सकता हूं',
        ta: 'நான் வழங்க முடியும்',
        bn: 'আমি অফার করতে পারি',
        te: 'నేను అందించగలను',
        mr: 'मी ऑफर करू शकतो',
        gu: 'હું ઓફર કરી શકું છું',
    },
};

export function translateText(text, fromLang, toLang) {
    // For demo: simple lookup
    if (SAMPLE_TRANSLATIONS[text] && SAMPLE_TRANSLATIONS[text][toLang]) {
        return SAMPLE_TRANSLATIONS[text][toLang];
    }

    // Fallback: indicate translation
    return `[${toLang.toUpperCase()}] ${text}`;
}

export function detectLanguage(text) {
    // Simple heuristic for demo
    const hindiPattern = /[\u0900-\u097F]/;
    const tamilPattern = /[\u0B80-\u0BFF]/;
    const bengaliPattern = /[\u0980-\u09FF]/;
    const teluguPattern = /[\u0C00-\u0C7F]/;
    const marathiPattern = /[\u0900-\u097F]/;
    const gujaratiPattern = /[\u0A80-\u0AFF]/;

    if (hindiPattern.test(text)) return 'hi';
    if (tamilPattern.test(text)) return 'ta';
    if (bengaliPattern.test(text)) return 'bn';
    if (teluguPattern.test(text)) return 'te';
    if (gujaratiPattern.test(text)) return 'mr';
    if (gujaratiPattern.test(text)) return 'gu';

    return 'en';
}
