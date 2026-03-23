import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

// Language code to full name mapping
const languageMap = {
  'es': 'Spanish',
  'fr': 'French',
  'ja': 'Japanese',
  'de': 'German',
  'hi': 'Hindi',
  'it': 'Italian',
  'zh': 'Chinese (Mandarin)',
  'ko': 'Korean',
  'ru': 'Russian',
  'pt': 'Portuguese',
  'ar': 'Arabic',
  'bn': 'Bengali',
  'ur': 'Urdu',
  'id': 'Indonesian',
  'tr': 'Turkish',
  'vi': 'Vietnamese',
  'th': 'Thai',
  'nl': 'Dutch',
  'pl': 'Polish',
  'el': 'Greek',
  'cs': 'Czech',
  'sv': 'Swedish',
  'da': 'Danish',
  'fi': 'Finnish',
  'no': 'Norwegian',
  'hu': 'Hungarian',
  'ro': 'Romanian',
  'bg': 'Bulgarian',
  'sr': 'Serbian',
  'hr': 'Croatian',
  'sk': 'Slovak',
  'sl': 'Slovenian',
  'lt': 'Lithuanian',
  'lv': 'Latvian',
  'et': 'Estonian',
  'he': 'Hebrew',
  'fa': 'Persian',
  'sw': 'Swahili',
  'am': 'Amharic',
  'yo': 'Yoruba',
  'zu': 'Zulu',
  'af': 'Afrikaans',
  'tl': 'Filipino',
  'ms': 'Malay',
  'ta': 'Tamil',
  'te': 'Telugu',
  'mr': 'Marathi',
  'gu': 'Gujarati',
  'pa': 'Punjabi',
  'kn': 'Kannada',
  'ml': 'Malayalam',
  'or': 'Odia'
};

router.post('/translate', async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;

    console.log("Input text:", text);
    console.log("Source language code:", sourceLanguage);
    console.log("Target language code:", targetLanguage);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Text is required" });
    }

    if (!targetLanguage) {
      return res.status(400).json({ message: "Target language is required" });
    }

    // Get language names from codes
    const sourceLangName = languageMap[sourceLanguage] || languageMap['en'] || 'English';
    const targetLangName = languageMap[targetLanguage] || languageMap['es'] || 'Spanish';

    console.log("Translating from:", sourceLangName, "to:", targetLangName);

    try {
      // Try using Gemini API
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

      const prompt = `Translate this text from ${sourceLangName} to ${targetLangName}. Return ONLY the translated text, nothing else, no explanations.

Text: ${text}`;

      console.log("Sending prompt to Gemini");

      const result = await model.generateContent(prompt);
      
      if (!result) {
        throw new Error('No result from Gemini API');
      }

      const response = result.response;
      if (!response) {
        throw new Error('No response object from Gemini API');
      }
      
      const translation = response.text().trim();
      
      if (!translation || translation.length === 0) {
        throw new Error('Empty translation received from Gemini');
      }

      console.log("Translation successful (Gemini):", translation);
      res.json({ translation });

    } catch (geminiError) {
      console.error("Gemini API Error:", geminiError.message);
      
      // Fallback: Use Google Translate API (free, no auth needed)
      console.log("Using Google Translate API fallback");
      
      try {
        const sl = sourceLanguage || 'en';
        const tl = targetLanguage;
        
        // Use Google's freely available translation endpoint
        const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        
        const response = await fetch(translateUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0'
          }
        });
        
        const data = await response.json();
        
        // Extract translation from response
        let translation = '';
        if (Array.isArray(data) && data[0]) {
          if (Array.isArray(data[0][0])) {
            translation = data[0].map(item => item[0]).join('');
          } else {
            translation = data[0];
          }
        }
        
        if (translation && translation.length > 0) {
          console.log("Translation successful (Google Translate):", translation);
          res.json({ translation });
        } else {
          throw new Error('Empty translation from Google Translate');
        }

      } catch (googleError) {
        console.error("Google Translate fallback error:", googleError.message);
        
        // Last resort: Simple word-by-word replacement
        console.log("Using basic word dictionary fallback");
        
        const dictionaries = {
          'es': {
            'hello': 'hola', 'hi': 'hola', 'what': 'qué', 'is': 'es', 'your': 'tu', 'name': 'nombre',
            'my': 'mi', 'how': 'cómo', 'are': 'estás', 'you': 'tú', 'good': 'bueno', 'morning': 'mañana',
            'thank': 'gracias', 'thanks': 'gracias', 'please': 'por favor', 'yes': 'sí', 'no': 'no',
            'water': 'agua', 'food': 'comida', 'love': 'amor', 'help': 'ayuda', 'friend': 'amigo'
          },
          'fr': {
            'hello': 'bonjour', 'hi': 'salut', 'what': 'quoi', 'is': 'est', 'your': 'ton', 'name': 'nom',
            'my': 'mon', 'how': 'comment', 'are': 'es-tu', 'you': 'tu', 'good': 'bon', 'morning': 'matin',
            'thank': 'merci', 'thanks': 'merci', 'please': 's\'il vous plaît', 'yes': 'oui', 'no': 'non',
            'water': 'eau', 'food': 'nourriture', 'love': 'amour', 'help': 'aide', 'friend': 'ami'
          },
          'de': {
            'hello': 'hallo', 'hi': 'hi', 'what': 'was', 'is': 'ist', 'your': 'dein', 'name': 'name',
            'my': 'mein', 'how': 'wie', 'are': 'bist', 'you': 'du', 'good': 'gut', 'morning': 'morgen',
            'thank': 'danke', 'thanks': 'danke', 'please': 'bitte', 'yes': 'ja', 'no': 'nein',
            'water': 'wasser', 'food': 'essen', 'love': 'liebe', 'help': 'hilfe', 'friend': 'freund'
          },
          'it': {
            'hello': 'ciao', 'hi': 'ciao', 'what': 'cosa', 'is': 'è', 'your': 'tuo', 'name': 'nome',
            'my': 'mio', 'how': 'come', 'are': 'sei', 'you': 'tu', 'good': 'buono', 'morning': 'mattina',
            'thank': 'grazie', 'thanks': 'grazie', 'please': 'per favore', 'yes': 'sì', 'no': 'no',
            'water': 'acqua', 'food': 'cibo', 'love': 'amore', 'help': 'aiuto', 'friend': 'amico'
          },
          'pt': {
            'hello': 'olá', 'hi': 'oi', 'what': 'o quê', 'is': 'é', 'your': 'seu', 'name': 'nome',
            'my': 'meu', 'how': 'como', 'are': 'está', 'you': 'você', 'good': 'bom', 'morning': 'manhã',
            'thank': 'obrigado', 'thanks': 'obrigado', 'please': 'por favor', 'yes': 'sim', 'no': 'não',
            'water': 'água', 'food': 'comida', 'love': 'amor', 'help': 'ajuda', 'friend': 'amigo'
          }
        };

        const dict = dictionaries[targetLanguage] || {};
        const words = text.toLowerCase().split(/\s+/);
        const translated = words.map(word => {
          // Remove punctuation for lookup
          const cleanWord = word.replace(/[.,!?;:]/g, '');
          const punctuation = word.match(/[.,!?;:]/g);
          const translatedWord = dict[cleanWord] || word;
          return translatedWord + (punctuation ? punctuation.join('') : '');
        }).join(' ');

        console.log("Translation successful (Dictionary):", translated);
        res.json({ translation: translated });
      }
    }

  } catch (error) {
    console.error("Translation Error:", error);
    console.error("Error message:", error.message);
    
    res.status(500).json({ 
      error: "Translation failed",
      message: error.message || 'Unknown error occurred'
    });
  }
});

export default router;