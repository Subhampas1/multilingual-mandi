import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMandiStore } from '../store/mandiStore';
import { LANGUAGES } from '../utils/languages';
import { Mic, User } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';

export default function LanguageSelection() {
    const navigate = useNavigate();
    const { setLanguage } = useMandiStore();
    const { startListening, transcript, isListening } = useVoiceInput('en');

    const handleLanguageSelect = (langCode) => {
        console.log('Language selected:', langCode);
        setLanguage(langCode);
        console.log('Language set in store, navigating to role-selection');
        navigate('/role-selection');
    };

    React.useEffect(() => {
        if (transcript) {
            const lowerTranscript = transcript.toLowerCase();
            const lang = Object.values(LANGUAGES).find(
                (l) =>
                    lowerTranscript.includes(l.name.toLowerCase()) ||
                    lowerTranscript.includes(l.nativeName.toLowerCase())
            );
            if (lang) {
                handleLanguageSelect(lang.code);
            }
        }
    }, [transcript]);

    return (
        <div
            className="min-h-screen relative"
            style={{
                backgroundImage: 'url(/market-scene6.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Subtle overlay - keep background visible */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* Header */}
            <header className="relative z-10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🌾</span>
                        <div>
                            <h1 className="text-lg font-bold text-white">The Multilingual Mandi</h1>
                            <p className="text-xs text-text-semi-bold-white">Viksit Bharat 2047</p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        <div className="gov-header-item">
                            <span className="text-sm">🇮🇳</span>
                            <span className="text-xs font-medium">हिंदी</span>
                        </div>
                        <div className="gov-profile-icon">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - Centered */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <div className="text-center max-w-4xl">

                    {/* Title */}
                    <h2 className="text-6xl font-extrabold text-white mb-4" style={{ textShadow: '2px 4px 8px rgba(0,0,0,0.5)' }}>
                        The Multilingual Mandi
                    </h2>
                    <p className="text-2xl text-white font-semibold mb-8" style={{ textShadow: '1px 2px 6px rgba(0,0,0,0.4)' }}>
                        Select your language to continue
                    </p>

                    {/* Compact Language Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
                        {Object.values(LANGUAGES)
                            .filter((lang) => lang.code !== 'en')
                            .map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLanguageSelect(lang.code)}
                                    className="gov-lang-tile"
                                >
                                    <span className="text-lg">🇮🇳</span>
                                    <span className="font-semibold text-sm text-earth">{lang.name}</span>
                                    <span className="text-xs text-text-light">{lang.nativeName}</span>
                                </button>
                            ))}
                    </div>

                    {/* Primary CTA - Microphone */}
                    <button
                        onClick={startListening}
                        className={`gov-mic-button ${isListening ? 'listening' : ''}`}
                        aria-label="Tap to speak"
                    >
                        <Mic className="w-10 h-10" />
                    </button>

                    <p className="gov-mic-label">
                        Or Tap to Speak <span className="text-xs">🎤</span>
                    </p>
                    <p className="gov-mic-sublabel">बोलने के लिए टैप करें</p>

                    {transcript && (
                        <div className="gov-transcript">
                            Listening: "{transcript}"
                        </div>
                    )}

                    {/* Secondary action */}
                    <button
                        onClick={() => handleLanguageSelect('en')}
                        className="gov-english-link"
                    >
                        Continue in English →
                    </button>
                </div>
            </div>
        </div>
    );
}
