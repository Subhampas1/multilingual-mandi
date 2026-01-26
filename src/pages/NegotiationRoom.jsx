import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMandiStore } from '../store/mandiStore';
import { getTranslation } from '../utils/languages';
import { translateText } from '../utils/translator';
import { generateCounterOffer, generateAcceptanceMessage } from '../ai/negotiationAssistant';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { Mic, Send, Check, TrendingDown, ArrowLeft, MessageCircle } from 'lucide-react';

export default function NegotiationRoom() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { language } = useMandiStore();

    const commodityName = searchParams.get('commodity') || 'Tomatoes';
    const initialPrice = parseInt(searchParams.get('price')) || 40;
    const quantity = searchParams.get('quantity') || '100 kg';

    const [messages, setMessages] = useState([
        {
            id: 1,
            from: 'vendor',
            lang: 'hi',
            text: `नमस्ते! मैं ${commodityName} बेच रहा हूं। ${quantity} के लिए मेरा मूल्य ₹${initialPrice}/kg है।`,
            translated: `Hello! I'm selling ${commodityName}. My price for ${quantity} is ₹${initialPrice}/kg.`,
            timestamp: new Date(),
        },
    ]);

    const [inputText, setInputText] = useState('');
    const [currentPrice, setCurrentPrice] = useState(initialPrice);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const userRole = 'buyer';

    const { startListening, transcript, isListening } = useVoiceInput(language);
    const t = (key) => getTranslation(language, key);

    useEffect(() => {
        if (transcript) {
            setInputText(transcript);
        }
    }, [transcript]);

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            from: userRole,
            lang: language,
            text: inputText,
            translated: translateText(inputText, language, 'hi'),
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setInputText('');
        setShowSuggestions(false);

        setTimeout(() => simulateVendorResponse(), 2000);
    };

    const simulateVendorResponse = () => {
        const responses = [
            {
                hi: 'मैं ₹38/kg तक जा सकता हूं। यह बहुत अच्छी गुणवत्ता है।',
                en: 'I can go down to ₹38/kg. This is very good quality.',
            },
            {
                hi: 'यह मेरी अंतिम कीमत है - ₹37/kg।',
                en: 'This is my final price - ₹37/kg.',
            },
            {
                hi: 'ठीक है, सौदा हो गया! ₹36/kg पर।',
                en: 'Okay, deal done! At ₹36/kg.',
            },
        ];

        const response = responses[Math.min(messages.length - 1, 2)];

        const vendorMessage = {
            id: messages.length + 1,
            from: 'vendor',
            lang: 'hi',
            text: response.hi,
            translated: response.en,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, vendorMessage]);
        const newPrice = currentPrice - 2;
        setCurrentPrice(newPrice);
    };

    const handleCounterOffer = (suggestedPrice) => {
        const counterText = language === 'hi'
            ? `क्या आप ₹${suggestedPrice}/kg स्वीकार करेंगे?`
            : `Would you accept ₹${suggestedPrice}/kg?`;

        const newMessage = {
            id: messages.length + 1,
            from: userRole,
            lang: language,
            text: counterText,
            translated: translateText(counterText, language, 'hi'),
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);
        setShowSuggestions(false);
        setCurrentPrice(suggestedPrice);

        setTimeout(() => simulateVendorResponse(), 2000);
    };

    const handleAcceptDeal = () => {
        const acceptMessage = generateAcceptanceMessage(currentPrice, language);

        const newMessage = {
            id: messages.length + 1,
            from: userRole,
            lang: language,
            text: acceptMessage,
            translated: translateText(acceptMessage, language, 'hi'),
            timestamp: new Date(),
        };

        setMessages([...messages, newMessage]);

        setTimeout(() => {
            alert(`🎉 Deal Accepted! Final Price: ₹${currentPrice}/kg\n\nThank you for using Multilingual Mandi!`);
            navigate('/market-board');
        }, 1500);
    };

    const suggestions = generateCounterOffer(currentPrice, currentPrice - 5, language);

    return (
        <div className="min-h-screen bg-gradient-to-b from-terracotta/5 to-bg">
            {/* Header */}
            <div className="premium-header px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/market-board')}
                        className="gov-back-btn"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg font-bold text-earth">{commodityName} - {quantity}</h1>
                        <div className="text-sm text-text-light">
                            Current: <span className="text-green font-semibold">₹{currentPrice}/kg</span>
                        </div>
                    </div>
                    <div className="w-16"></div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="gov-chat-container">
                    {/* Messages */}
                    <div className="gov-chat-messages">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.from === userRole ? 'justify-end' : 'justify-start'} mb-4`}
                            >
                                <div
                                    className={`gov-chat-bubble ${msg.from === userRole ? 'buyer' : 'vendor'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold">
                                            {msg.from === 'vendor' ? 'विक्रेता (Vendor)' : 'Buyer'}
                                        </span>
                                        <span className="text-xs opacity-75">{msg.lang.toUpperCase()}</span>
                                    </div>
                                    <p className="mb-1">{msg.text}</p>
                                    {msg.translated && msg.from !== userRole && (
                                        <p className="text-xs opacity-75 italic border-t border-white/20 pt-1 mt-1">
                                            {msg.translated}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI Suggestions */}
                    {showSuggestions && (
                        <div className="gov-suggestions-panel">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-green rounded-full animate-pulse"></div>
                                <span className="text-sm font-semibold">AI Smart Suggestions</span>
                            </div>
                            <div className="grid gap-2">
                                {suggestions.slice(0, 2).map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCounterOffer(suggestion.price)}
                                        className="gov-suggestion-card"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-semibold text-green">₹{suggestion.price}/kg</span>
                                            <span className="text-xs text-text-light capitalize">{suggestion.tone}</span>
                                        </div>
                                        <p className="text-sm text-text-light">{suggestion.message}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="gov-chat-input-area">
                        <div className="flex gap-2 mb-3">
                            <button
                                onClick={handleAcceptDeal}
                                className="gov-primary-btn flex-1"
                            >
                                <Check className="w-4 h-4" />
                                Accept ₹{currentPrice}/kg
                            </button>
                            <button
                                onClick={() => setShowSuggestions(!showSuggestions)}
                                className="gov-secondary-btn flex-1"
                            >
                                <TrendingDown className="w-4 h-4" />
                                Counter Offer
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={`Type in ${language.toUpperCase()}...`}
                                className="gov-input"
                            />
                            <button
                                onClick={startListening}
                                className={`gov-voice-btn ${isListening ? 'listening' : ''}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleSendMessage}
                                disabled={!inputText.trim()}
                                className="gov-icon-btn"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Help Text */}
                <div className="text-center mt-4 text-sm text-text-light">
                    <MessageCircle className="w-4 h-4 inline mr-1" />
                    Messages translate automatically • AI suggests fair counter-offers
                </div>
            </div>
        </div>
    );
}
