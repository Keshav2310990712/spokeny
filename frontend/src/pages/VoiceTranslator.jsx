import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Volume2, Globe, Sparkles, MessageSquare, SendHorizonal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { updateProgressState } from '../slices/authSlice';
import { aiAPI, authAPI } from '../services/api';

const VoiceTranslator = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en'); // Source language - English
  const [targetLang, setTargetLang] = useState('es'); // Target language - Spanish
  const [coachPrompt, setCoachPrompt] = useState('');
  const [coachReply, setCoachReply] = useState('');
  const [coachLoading, setCoachLoading] = useState(false);
  
  const recognitionRef = useRef(null);
  const coachSectionRef = useRef(null);

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

  useEffect(() => {
    if (location.state?.coachPrompt) {
      setCoachPrompt(location.state.coachPrompt);
      setCoachReply('');
    }

    if (location.state?.openCoach) {
      setTimeout(() => {
        coachSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [location.state]);

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

  const handleAskCoach = async () => {
    if (!coachPrompt.trim()) {
      return;
    }

    try {
      setCoachLoading(true);
      setCoachReply('');

      const response = await aiAPI.askCoach({
        prompt: coachPrompt,
        courseTitle: location.state?.courseTitle,
        lessonTitle: location.state?.lessonTitle,
        task: location.state?.task,
      });

      setCoachReply(response.data.reply);
    } catch (error) {
      setCoachReply(
        error.response?.data?.message ||
          'The AI coach could not answer right now. Please try again in a moment.'
      );
    } finally {
      setCoachLoading(false);
    }
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

      <div
        ref={coachSectionRef}
        className="w-full mt-10 glass rounded-[2.5rem] p-8 md:p-10 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <MessageSquare className="w-7 h-7 text-brand-500" />
              AI Study Coach
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
              Use this when you want help understanding a project, practice task, or lesson step by step. The translator above stays exactly the same.
            </p>
          </div>
          {location.state?.lessonTitle && (
            <div className="px-4 py-2 rounded-full bg-brand-500/10 text-brand-500 text-sm font-semibold">
              From: {location.state.lessonTitle}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ask for help with your task
            </label>
            <textarea
              value={coachPrompt}
              onChange={(e) => setCoachPrompt(e.target.value)}
              placeholder="Example: Explain what this project wants me to build, give me steps, and show me a small example."
              className="w-full min-h-[220px] p-5 rounded-2xl bg-white/50 dark:bg-dark-surface/50 border border-gray-200 dark:border-gray-700 shadow-inner text-base text-gray-800 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
            />
            <button
              onClick={handleAskCoach}
              disabled={!coachPrompt.trim() || coachLoading}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendHorizonal className="w-4 h-4" />
              {coachLoading ? 'Thinking...' : 'Ask AI Coach'}
            </button>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Coach response
            </label>
            <div className="min-h-[220px] p-5 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border border-brand-200 dark:border-brand-500/30 shadow-inner whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
              {coachReply || (
                <span className="text-brand-400/60 italic">
                  The AI coach will break your task into simpler steps here.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceTranslator;
