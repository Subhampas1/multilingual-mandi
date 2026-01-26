import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMandiStore } from '../store/mandiStore';
import { getTranslation } from '../utils/languages';
import { MOCK_COMMODITIES } from '../data/mockMarketData';
import { Search, Mic, MapPin, Plus, ArrowLeft } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';

export default function MarketBoard() {
    const navigate = useNavigate();
    const { language, commodities: userCommodities } = useMandiStore();
    const { startListening, transcript, isListening } = useVoiceInput(language);

    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all');

    const t = (key) => getTranslation(language, key);

    const allCommodities = [...MOCK_COMMODITIES, ...userCommodities];

    const filteredCommodities = allCommodities.filter((c) => {
        const matchesSearch =
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
            filter === 'all' ||
            (filter === 'vegetables' && ['Tomatoes', 'Potatoes', 'Onions'].includes(c.name)) ||
            (filter === 'grains' && ['Rice', 'Wheat'].includes(c.name));

        return matchesSearch && matchesFilter;
    });

    React.useEffect(() => {
        if (transcript) {
            setSearchQuery(transcript);
        }
    }, [transcript]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-saffron/5 to-bg">
            {/* Header */}
            <div className="premium-header px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/role-selection')}
                        className="gov-back-btn"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🏪</span>
                        <span className="text-lg font-semibold text-earth">Digital Mandi</span>
                    </div>
                    <button
                        onClick={() => navigate('/vendor-dashboard')}
                        className="gov-secondary-btn-sm"
                    >
                        <Plus className="w-4 h-4" />
                        List Commodity
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="gov-search-card">
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search commodities or locations..."
                                className="gov-search-input"
                            />
                        </div>
                        <button
                            onClick={startListening}
                            className={`gov-voice-btn ${isListening ? 'listening' : ''}`}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`gov-filter-chip ${filter === 'all' ? 'active' : ''}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('vegetables')}
                            className={`gov-filter-chip ${filter === 'vegetables' ? 'active' : ''}`}
                        >
                            Vegetables
                        </button>
                        <button
                            onClick={() => setFilter('grains')}
                            className={`gov-filter-chip ${filter === 'grains' ? 'active' : ''}`}
                        >
                            Grains
                        </button>
                    </div>
                </div>

                {/* Commodity Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredCommodities.map((commodity) => (
                        <div
                            key={commodity.id}
                            className="gov-commodity-card"
                            onClick={() => {
                                const params = new URLSearchParams({
                                    commodity: commodity.name,
                                    price: commodity.suggestedPrice || commodity.bestPrice,
                                    quantity: `${commodity.quantity} ${commodity.unit}`
                                });
                                navigate(`/negotiate?${params.toString()}`);
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="text-4xl">{commodity.image || '📦'}</div>
                                {commodity.bestPrice && (
                                    <span className="gov-best-price-badge">Best Price</span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold text-earth mb-1">{commodity.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-text-light mb-3">
                                <MapPin className="w-4 h-4" />
                                {commodity.location}
                            </div>

                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-3xl font-bold text-green">
                                    ₹{commodity.suggestedPrice || commodity.bestPrice}
                                </span>
                                <span className="text-sm text-text-light">/{commodity.unit}</span>
                            </div>

                            {commodity.priceMin && commodity.priceMax && (
                                <div className="text-sm text-text-light mb-3">
                                    Range: ₹{commodity.priceMin}-{commodity.priceMax}
                                </div>
                            )}

                            <div className="pt-3 border-t border-border/50">
                                <div className="text-sm text-text-light">
                                    Available: {commodity.quantity} {commodity.unit}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCommodities.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-lg text-text-light">No commodities found. Try a different search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
