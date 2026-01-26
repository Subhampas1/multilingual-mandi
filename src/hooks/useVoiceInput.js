import { useState, useEffect } from 'react';

export function useVoiceInput(language = 'en') {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState(null);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        // Check if browser supports Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError('Speech recognition not supported in this browser');
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;

        // Map language codes to speech recognition languages
        const langMap = {
            hi: 'hi-IN',
            ta: 'ta-IN',
            bn: 'bn-IN',
            te: 'te-IN',
            mr: 'mr-IN',
            gu: 'gu-IN',
            en: 'en-IN',
        };

        recognitionInstance.lang = langMap[language] || 'en-IN';

        recognitionInstance.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setTranscript(transcript);
        };

        recognitionInstance.onerror = (event) => {
            setError(event.error);
            setIsListening(false);
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
        };

        setRecognition(recognitionInstance);

        return () => {
            if (recognitionInstance) {
                recognitionInstance.stop();
            }
        };
    }, [language]);

    const startListening = () => {
        if (recognition && !isListening) {
            setTranscript('');
            recognition.start();
        }
    };

    const stopListening = () => {
        if (recognition && isListening) {
            recognition.stop();
        }
    };

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        isSupported: !!recognition,
    };
}
