import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, Globe, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgressState } from '../slices/authSlice';
import { authAPI } from '../services/api';

const VoiceTranslator = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Source language - English
  const [targetLang, setTargetLang] = useState('es'); // Target language - Spanish
  
  const recognitionRef = useRef(null);

  const handleSpeak = useCallback((text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    // BCP-47 mapping for supported languages
    const langMap = {
      'es': 'es-ES', 'fr': 'fr-FR', 'ja': 'ja-JP', 'de': 'de-DE', 'hi': 'hi-IN',
      'it': 'it-IT', 'zh': 'zh-CN', 'ko': 'ko-KR', 'ru': 'ru-RU', 'pt': 'pt-BR',
      'ar': 'ar-SA', 'bn': 'bn-IN', 'ur': 'ur-PK', 'id': 'id-ID', 'tr': 'tr-TR',
      'vi': 'vi-VN', 'th': 'th-TH', 'nl': 'nl-NL', 'pl': 'pl-PL', 'el': 'el-GR',
      'cs': 'cs-CZ', 'sv': 'sv-SE', 'da': 'da-DK', 'fi': 'fi-FI', 'no': 'nb-NO',
      'hu': 'hu-HU', 'ro': 'ro-RO', 'bg': 'bg-BG', 'sr': 'sr-RS', 'hr': 'hr-HR',
      'sk': 'sk-SK', 'sl': 'sl-SI', 'lt': 'lt-LT', 'lv': 'lv-LV', 'et': 'et-EE',
      'he': 'he-IL', 'fa': 'fa-IR', 'sw': 'sw-KE', 'am': 'am-ET', 'yo': 'yo-NG',
      'zu': 'zu-ZA', 'af': 'af-ZA', 'tl': 'tl-PH', 'ms': 'ms-MY', 'ta': 'ta-IN',
      'te': 'te-IN', 'mr': 'mr-IN', 'gu': 'gu-IN', 'pa': 'pa-IN', 'kn': 'kn-IN'
    };
    utterance.lang = langMap[targetLang] || 'en-US';
    window.speechSynthesis.speak(utterance);
  }, [targetLang]);

  const simulateTranslation = useCallback(async (text) => {
    try {
      setTranslatedText('Translating...');
      
      console.log('Sending translation request:', { text, sourceLang, targetLang });
      
      const response = await fetch('http://localhost:5000/api/ai/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          sourceLanguage: sourceLang || 'en',
          targetLanguage: targetLang || 'es'
        })
      });
      
      console.log('Translation response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Translation failed');
      }
      
      const data = await response.json();
      console.log('Translation response:', data);
      
      if (!data.translation) {
        throw new Error('No translation in response');
      }
      
      setTranslatedText(data.translation);
      handleSpeak(data.translation);

      // Add gamification XP only if logged in
      if (userInfo) {
        try {
          const progressRes = await authAPI.updateProgress({ xpToAdd: 5, studyTimeToAdd: 0.5 });
          dispatch(updateProgressState(progressRes.data));
        } catch (err) {
          console.error('Failed to update progress:', err);
        }
      }

    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('❌ ' + (error.message || 'Translation failed. Check backend.'));
    }
  }, [sourceLang, targetLang, handleSpeak, dispatch, userInfo]);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      // Set speech recognition language based on sourceLang
      const langMap = {
        'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE', 'it': 'it-IT',
        'pt': 'pt-BR', 'ja': 'ja-JP', 'ko': 'ko-KR', 'zh': 'zh-CN', 'ar': 'ar-SA',
        'hi': 'hi-IN', 'ru': 'ru-RU', 'nl': 'nl-NL', 'pl': 'pl-PL', 'tr': 'tr-TR'
      };
      recognitionRef.current.lang = langMap[sourceLang] || 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let resultIdx = event.resultIndex; resultIdx < event.results.length; ++resultIdx) {
          if (event.results[resultIdx].isFinal) {
            finalTranscript += event.results[resultIdx][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript((prev) => prev + ' ' + finalTranscript);
          simulateTranslation(finalTranscript);
        }
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }
  }, [simulateTranslation, sourceLang]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setTranslatedText('');
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-brand-500 to-purple-500 bg-clip-text text-transparent">
          Real-Time AI Translator
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Speak naturally and let Spokeny's AI voice instantly translate and speak back in your chosen language.
        </p>
      </div>

      <div className="w-full glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        {isListening && (
          <div className="absolute inset-0 bg-brand-500/5 mix-blend-overlay z-0" />
        )}
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-gray-700 dark:text-gray-300">You</h3>
              <select 
                className="bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Mandarin Chinese</option>
                <option value="ar">Arabic</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ur">Urdu</option>
                <option value="id">Indonesian</option>
                <option value="tr">Turkish</option>
                <option value="vi">Vietnamese</option>
                <option value="th">Thai</option>
                <option value="nl">Dutch</option>
                <option value="pl">Polish</option>
                <option value="el">Greek</option>
              </select>
            </div>
            
            <div className="relative">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Press the microphone and start speaking, or type here..."
                className="w-full min-h-[150px] p-6 rounded-2xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 shadow-inner text-xl text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
              <button
                onClick={() => simulateTranslation(transcript)}
                disabled={!transcript.trim() || translatedText === 'Translating...'}
                className="absolute bottom-4 right-4 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md flex items-center gap-2"
              >
                {translatedText === 'Translating...' ? 'Translating...' : 'Translate'}
              </button>
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={toggleListen}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-105 active:scale-95 ${
                  isListening 
                    ? 'bg-red-500 shadow-red-500/50 animate-pulse' 
                    : 'bg-brand-500 shadow-brand-500/50 hover:bg-brand-600'
                }`}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center hidden md:flex">
             <Globe className={`w-12 h-12 text-gray-300 dark:text-gray-700 ${isListening ? 'animate-spin-slow' : ''}`} />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-brand-500 flex items-center gap-2">
                <Sparkles className="w-5 h-5"/> AI Translation
              </h3>
              <select 
                className="bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 max-h-48 overflow-y-auto"
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ru">Russian</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Mandarin Chinese</option>
                <option value="ar">Arabic</option>
                <option value="hi">Hindi</option>
                <option value="bn">Bengali</option>
                <option value="ur">Urdu</option>
                <option value="id">Indonesian</option>
                <option value="tr">Turkish</option>
                <option value="vi">Vietnamese</option>
                <option value="th">Thai</option>
                <option value="nl">Dutch</option>
                <option value="pl">Polish</option>
                <option value="el">Greek</option>
                <option value="cs">Czech</option>
                <option value="sv">Swedish</option>
                <option value="da">Danish</option>
                <option value="fi">Finnish</option>
                <option value="no">Norwegian</option>
                <option value="hu">Hungarian</option>
                <option value="ro">Romanian</option>
                <option value="bg">Bulgarian</option>
                <option value="sr">Serbian</option>
                <option value="hr">Croatian</option>
                <option value="sk">Slovak</option>
                <option value="sl">Slovenian</option>
                <option value="lt">Lithuanian</option>
                <option value="lv">Latvian</option>
                <option value="et">Estonian</option>
                <option value="he">Hebrew</option>
                <option value="fa">Persian (Farsi)</option>
                <option value="sw">Swahili</option>
                <option value="am">Amharic</option>
                <option value="yo">Yoruba</option>
                <option value="zu">Zulu</option>
                <option value="af">Afrikaans</option>
                <option value="tl">Tagalog</option>
                <option value="ms">Malay</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
                <option value="gu">Gujarati</option>
                <option value="pa">Punjabi</option>
                <option value="kn">Kannada</option>
              </select>
            </div>
            
            <div className="min-h-[150px] p-6 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border border-brand-200 dark:border-brand-500/30 shadow-inner">
              <p className="text-xl text-brand-700 dark:text-brand-300 leading-relaxed font-medium">
                {translatedText || <span className="text-brand-400/50 italic">Translation will appear here...</span>}
              </p>
            </div>
            
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleSpeak(translatedText)}
                disabled={!translatedText}
                className={`p-4 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 bg-brand-100 dark:bg-brand-900/30 transition-all transform hover:scale-105 active:scale-95 ${
                  !translatedText && 'opacity-50 cursor-not-allowed'
                }`}
              >
                <Volume2 size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceTranslator;
