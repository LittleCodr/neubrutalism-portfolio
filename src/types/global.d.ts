// Add type definitions for Web Speech API
type SpeechRecognition = any;
type SpeechGrammarList = any;
type SpeechRecognitionEvent = any;

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
    SpeechGrammarList: typeof SpeechGrammarList;
    webkitSpeechGrammarList: typeof SpeechGrammarList;
    SpeechRecognitionEvent: typeof SpeechRecognitionEvent;
    webkitSpeechRecognitionEvent: typeof SpeechRecognitionEvent;
  }
}

export {};
