import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMandiStore } from '../store/mandiStore';
import { getTranslation } from '../utils/languages';
import { calculatePrice, explainPrice } from '../ai/priceEngine';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { Mic, TrendingUp, ArrowLeft, Info, Store } from 'lucide-react';

export default function VendorDashboard() {
    const navigate = useNavigate();
    const { language, addCommodity } = useMandiStore();
    const t = (key) => getTranslation(language, key);

    const [commodity, setCommodity] = useState('');
    const [quantity, setQuantity] = useState('');
    const [location, setLocation] = useState('');
    const [priceData, setPriceData] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const { startListening: listenCommodity, transcript: commodityTranscript, isListening: listeningCommodity } = useVoiceInput(language);
    const { startListening: listenQuantity, transcript: quantityTranscript, isListening: listeningQuantity } = useVoiceInput(language);
    const { startListening: listenLocation, transcript: locationTranscript, isListening: listeningLocation } = useVoiceInput(language);

    useEffect(() => { if (commodityTranscript) setCommodity(commodityTranscript); }, [commodityTranscript]);
    useEffect(() => { if (quantityTranscript) setQuantity(quantityTranscript); }, [quantityTranscript]);
    useEffect(() => { if (locationTranscript) setLocation(locationTranscript); }, [locationTranscript]);

    const handleGetPrice = () => {
        const price = calculatePrice(commodity, location, language);
        setPriceData(price);
        setShowExplanation(false);
    };

    const handleList = () => {
        addCommodity({
            name: commodity,
            quantity: parseInt(quantity) || 100,
            unit: 'kg',
            location,
            suggestedPrice: priceData?.suggestedPrice,
            priceMin: priceData?.min,
            priceMax: priceData?.max,
            vendorName: 'You',
        });
        navigate('/market-board');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green/5 to-bg">
            {/* Header */}
            <div className="premium-header px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/role-selection')}
                        className="gov-back-btn"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-2">
                        <Store className="w-6 h-6 text-green" />
                        <span className="text-lg font-semibold text-earth">Vendor Dashboard</span>
                    </div>
                    <button
                        onClick={() => navigate('/market-board')}
                        className="gov-secondary-btn-sm"
                    >
                        Browse Mandi →
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-earth mb-2">List Your Commodity</h1>
                    <p className="text-lg text-text-light">Get AI-powered fair price suggestions</p>
                </div>

                {/* Form Card */}
                <div className="gov-form-card">
                    {/* Commodity Input */}
                    <div className="gov-input-group">
                        <label className="gov-label">What are you selling?</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={commodity}
                                onChange={(e) => setCommodity(e.target.value)}
                                placeholder="e.g., Tomatoes, Rice, Wheat"
                                className="gov-input"
                            />
                            <button
                                onClick={listenCommodity}
                                className={`gov-voice-btn ${listeningCommodity ? 'listening' : ''}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Quantity Input */}
                    <div className="gov-input-group">
                        <label className="gov-label">Quantity (kg)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="e.g., 100"
                                className="gov-input"
                            />
                            <button
                                onClick={listenQuantity}
                                className={`gov-voice-btn ${listeningQuantity ? 'listening' : ''}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Location Input */}
                    <div className="gov-input-group">
                        <label className="gov-label">Your Location</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g., Nashik, Pune"
                                className="gov-input"
                            />
                            <button
                                onClick={listenLocation}
                                className={`gov-voice-btn ${listeningLocation ? 'listening' : ''}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Get Price Button */}
                    <button
                        onClick={handleGetPrice}
                        disabled={!commodity || !location}
                        className="gov-primary-btn w-full"
                    >
                        <TrendingUp className="w-5 h-5" />
                        Get AI Price Suggestion
                    </button>

                    {/* Price Result */}
                    {priceData && (
                        <div className="gov-price-result">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-text-light">Suggested Price</span>
                                <button
                                    onClick={() => setShowExplanation(!showExplanation)}
                                    className="gov-info-btn"
                                >
                                    <Info className="w-4 h-4" />
                                    Why this price?
                                </button>
                            </div>

                            <div className="text-center mb-4">
                                <div className="text-5xl font-bold text-green mb-2">
                                    ₹{priceData.suggestedPrice}
                                    <span className="text-lg text-text-light">/kg</span>
                                </div>
                                <div className="text-sm text-text-light">
                                    Range: ₹{priceData.min} - ₹{priceData.max}
                                </div>
                            </div>

                            {showExplanation && (
                                <div className="gov-explanation-box">
                                    <h4 className="font-semibold text-earth mb-2">Price Factors:</h4>
                                    {explainPrice(priceData, commodity, location, language).map((reason, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm text-text-light mb-1">
                                            <span className="text-green">•</span>
                                            <span>{reason}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                onClick={handleList}
                                className="gov-secondary-btn w-full"
                            >
                                List at ₹{priceData.suggestedPrice}/kg
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
