// AI-powered price discovery engine for agricultural commodities

export function calculatePrice(commodity, location, language = 'en') {
    // Simulate AI price calculation based on multiple factors

    // Base prices (in rupees per kg)
    const basePrices = {
        Tomatoes: 35,
        Potatoes: 25,
        Onions: 30,
        Rice: 45,
        Wheat: 28,
        Cotton: 55,
    };

    const basePrice = basePrices[commodity] || 40;

    // Location multipliers (premium locations)
    const locationFactors = {
        Nashik: 1.1,
        Pune: 1.15,
        Mumbai: 1.2,
        Delhi: 1.12,
        Bangalore: 1.18,
    };

    const locationFactor = locationFactors[location] || 1.0;

    // Seasonal adjustment (simplified)
    const seasonalFactor = 1.05 + (Math.random() * 0.1 - 0.05);

    // Calculate suggested price
    const suggestedPrice = Math.round(basePrice * locationFactor * seasonalFactor);
    const min = Math.round(suggestedPrice * 0.9);
    const max = Math.round(suggestedPrice * 1.1);

    return {
        suggestedPrice,
        min,
        max,
        factors: {
            base: basePrice,
            location: locationFactor,
            seasonal: seasonalFactor,
        },
    };
}

export function explainPrice(priceData, commodity, location, language = 'en') {
    const explanations = {
        en: [
            `📈 High market demand for ${commodity} in your region`,
            `📅 Current seasonal trends indicate favorable pricing`,
            `📍 ${location} has competitive pricing compared to nearby mandis`,
        ],
        hi: [
            `📈 आपके क्षेत्र में ${commodity} की उच्च मांग`,
            `📅 वर्तमान मौसमी रुझान अनुकूल मूल्य निर्धारण का संकेत देते हैं`,
            `📍 ${location} में पास के मंडियों की तुलना में प्रतिस्पर्धी मूल्य है`,
        ],
        ta: [
            `📈 உங்கள் பகுதியில் ${commodity} க்கு அதிக சந்தை தேவை`,
            `📅 தற்போதைய பருவகால போக்குகள் சாதகமான விலையை குறிக்கின்றன`,
            `📍 ${location} அருகிலுள்ள மண்டிகளுடன் ஒப்பிடும்போது போட்டி விலை உள்ளது`,
        ],
    };

    return explanations[language] || explanations.en;
}

export function getPriceHistory(commodity, days = 7) {
    // Simulate price history for the last N days
    const history = [];
    const basePrice = 40;

    for (let i = days - 1; i >= 0; i--) {
        const variance = Math.random() * 10 - 5;
        history.push({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            price: Math.round(basePrice + variance),
        });
    }

    return history;
}

export function comparePrices(commodity, userLocation, otherLocations) {
    // Compare prices across multiple locations
    return otherLocations.map((location) => ({
        location,
        price: calculatePrice(commodity, location).suggestedPrice,
    }));
}
