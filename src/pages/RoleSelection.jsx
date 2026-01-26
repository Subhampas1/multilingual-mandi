import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMandiStore } from '../store/mandiStore';
import { getTranslation } from '../utils/languages';
import { Store, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function RoleSelection() {
    const navigate = useNavigate();
    const { language } = useMandiStore();
    const t = (key) => getTranslation(language, key);

    console.log('RoleSelection - Current language from store:', language);

    const handleRoleSelect = (role) => {
        useMandiStore.setState({ userRole: role });
        if (role === 'vendor') {
            navigate('/vendor-dashboard');
        } else {
            navigate('/market-board');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cream/30 to-bg">
            {/* Header */}
            <div className="premium-header px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="gov-back-btn"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {t('welcomeBack')}
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        <span className="text-lg font-semibold text-earth">The Multilingual Mandi</span>
                    </div>
                    <div className="w-24"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-earth mb-3">{t('selectLanguage')}</h1>
                    <p className="text-lg text-text-light">{t('speakInYourLanguage')}</p>
                </div>

                {/* Role Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Vendor Card */}
                    <button
                        onClick={() => handleRoleSelect('vendor')}
                        className="gov-role-card group"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green to-olive flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Store className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-earth mb-2">{t('vendor')}</h3>
                        <p className="text-text-light mb-4">
                            {t('listCommodity')} - {t('aiSuggestedPrice')}
                        </p>
                        <div className="gov-role-features">
                            <span>✓ {t('aiSuggestedPrice')}</span>
                            <span>✓ {t('marketDemand')}</span>
                            <span>✓ {t('voiceSearch')}</span>
                        </div>
                    </button>

                    {/* Buyer Card */}
                    <button
                        onClick={() => handleRoleSelect('buyer')}
                        className="gov-role-card group"
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-saffron to-terracotta flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-earth mb-2">{t('buyer')}</h3>
                        <p className="text-text-light mb-4">
                            {t('browseMandi')} - {t('negotiate')}
                        </p>
                        <div className="gov-role-features">
                            <span>✓ {t('bestPrice')}</span>
                            <span>✓ {t('negotiate')}</span>
                            <span>✓ {t('voiceSearch')}</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
