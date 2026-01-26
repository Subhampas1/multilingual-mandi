// AI Negotiation Assistant

export function generateCounterOffer(currentPrice, targetPrice, language = 'en') {
    const midPrice = Math.round((currentPrice + targetPrice) / 2);
    const slightlyHigher = Math.round(targetPrice * 1.05);
    const slightlyLower = Math.round(currentPrice * 0.95);

    const suggestions = {
        en: [
            {
                price: midPrice,
                message: `How about we meet in the middle at ₹${midPrice}?`,
                tone: 'friendly',
            },
            {
                price: slightlyLower,
                message: `I can adjust to ₹${slightlyLower} for this quality.`,
                tone: 'reasonable',
            },
            {
                price: slightlyHigher,
                message: `Given the market rate, ₹${slightlyHigher} would be fair.`,
                tone: 'factual',
            },
        ],
        hi: [
            {
                price: midPrice,
                message: `क्या हम बीच में ₹${midPrice} पर मिल सकते हैं?`,
                tone: 'friendly',
            },
            {
                price: slightlyLower,
                message: `मैं इस गुणवत्ता के लिए ₹${slightlyLower} तक समायोजित कर सकता हूं।`,
                tone: 'reasonable',
            },
            {
                price: slightlyHigher,
                message: `बाजार दर को देखते हुए, ₹${slightlyHigher} उचित होगा।`,
                tone: 'factual',
            },
        ],
        ta: [
            {
                price: midPrice,
                message: `நாம் நடுவில் ₹${midPrice} இல் சந்திக்கலாமா?`,
                tone: 'friendly',
            },
            {
                price: slightlyLower,
                message: `இந்த தரத்திற்கு நான் ₹${slightlyLower} வரை சரிசெய்யலாம்.`,
                tone: 'reasonable',
            },
            {
                price: slightlyHigher,
                message: `சந்தை விலையைக் கருத்தில் கொண்டு, ₹${slightlyHigher} நியாயமாக இருக்கும்.`,
                tone: 'factual',
            },
        ],
    };

    return suggestions[language] || suggestions.en;
}

export function analyzeNegotiation(messages, userRole) {
    // Analyze conversation and provide guidance
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) return null;

    // Simple sentiment analysis (would use NLP in production)
    const isAggressive = /urgent|final|last/i.test(lastMessage.text);
    const isFlexible = /consider|maybe|perhaps/i.test(lastMessage.text);

    return {
        sentiment: isAggressive ? 'firm' : isFlexible ? 'flexible' : 'neutral',
        recommendation: isAggressive
            ? 'Consider accepting or making a final counter'
            : 'Continue negotiating - there\'s room to discuss',
    };
}

export function generateAcceptanceMessage(finalPrice, language = 'en') {
    const messages = {
        en: `Great! Deal accepted at ₹${finalPrice}. Thank you for fair negotiation.`,
        hi: `बढ़िया! ₹${finalPrice} पर सौदा स्वीकार किया गया। निष्पक्ष बातचीत के लिए धन्यवाद।`,
        ta: `அருமை! ₹${finalPrice} இல் ஒப்பந்தம் ஏற்றுக்கொள்ளப்பட்டது. நியாயமான பேச்சுவார்த்தைக்கு நன்றி.`,
        bn: `দুর্দান্ত! ₹${finalPrice} এ চুক্তি গৃহীত হয়েছে। ন্যায্য আলোচনার জন্য ধন্যবাদ।`,
        te: `గొప్ప! ₹${finalPrice} వద్ద ఒప్పందం అంగీకరించబడింది. న్యాయమైన చర్చలకు ధన్యవాదాలు.`,
        mr: `छान! ₹${finalPrice} वर करार स्वीकारला गेला. निष्पक्ष चर्चेसाठी धन్यवाद।`,
        gu: `સરસ! ₹${finalPrice} પર સોદો સ્વીકારવામાં આવ્યો. ન્યાયી વાટાઘાટો માટે આભાર.`,
    };

    return messages[language] || messages.en;
}

export function suggestNegotiationStrategy(priceGap, userRole, language = 'en') {
    const strategies = {
        en: {
            large: userRole === 'vendor'
                ? 'Consider small concessions to build trust'
                : 'Explain your budget constraints politely',
            medium: 'You\'re close! Suggest meeting in the middle',
            small: 'Minor difference - offer to close the deal now',
        },
        hi: {
            large: userRole === 'vendor'
                ? 'विश्वास बनाने के लिए छोटी छूट पर विचार करें'
                : 'अपनी बजट सीमाओं को विनम्रता से समझाएं',
            medium: 'आप करीब हैं! बीच में मिलने का सुझाव दें',
            small: 'मामूली अंतर - अभी सौदा बंद करने की पेशकश करें',
        },
        ta: {
            large: userRole === 'vendor'
                ? 'நம்பிக்கையை உருவாக்க சிறிய சலுகைகளை கருத்தில் கொள்ளுங்கள்'
                : 'உங்கள் பட்ஜெட் வரம்புகளை பணிவுடன் விளக்குங்கள்',
            medium: 'நீங்கள் நெருக்கமாக இருக்கிறீர்கள்! நடுவில் சந்திக்க பரிந்துரைக்கவும்',
            small: 'சிறிய வித்தியாசம் - இப்போது ஒப்பந்தத்தை மூட வழங்கவும்',
        },
    };

    const langStrategies = strategies[language] || strategies.en;

    if (priceGap > 20) return langStrategies.large;
    if (priceGap > 10) return langStrategies.medium;
    return langStrategies.small;
}
