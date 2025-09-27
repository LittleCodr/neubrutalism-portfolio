import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff } from 'react-icons/fi';

export default function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            handleCommand(transcript.toLowerCase());
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start();
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!isListening) {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
        setTranscript('Listening...');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setTranscript('Error: Could not access microphone');
      }
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
      setTranscript('');
    }
  };

  const handleCommand = (command: string) => {
    // Navigation commands
    if (command.includes('go to') || command.includes('navigate to')) {
      if (command.includes('home') || command.includes('hero')) {
        window.location.hash = 'hero';
      } else if (command.includes('about')) {
        window.location.hash = 'about';
      } else if (command.includes('projects') || command.includes('work')) {
        window.location.hash = 'projects';
      } else if (command.includes('contact') || command.includes('get in touch')) {
        window.location.hash = 'contact';
      }
    }
    
    // Social commands
    else if (command.includes('open') || command.includes('visit')) {
      if (command.includes('linkedin')) {
        window.open('https://linkedin.com/in/yourusername', '_blank');
      } else if (command.includes('github')) {
        window.open('https://github.com/yourusername', '_blank');
      } else if (command.includes('twitter')) {
        window.open('https://twitter.com/yourusername', '_blank');
      }
    }
    
    // General commands
    else if (command.includes('stop listening') || command.includes('that\'s all')) {
      toggleListening();
    } else if (command.includes('clear') || command.includes('reset')) {
      setTranscript('');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 1000 }}>
      <motion.button
        onClick={toggleListening}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isListening 
            ? 'linear-gradient(135deg, #ef4444, #f59e0b)' 
            : 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: isListening 
            ? '0 0 20px rgba(239, 68, 68, 0.5)' 
            : '0 10px 25px rgba(124, 58, 237, 0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isListening ? (
          <>
            <FiMicOff />
            <motion.span
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
          </>
        ) : (
          <FiMic />
        )}
      </motion.button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              left: '0',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '10px',
              fontSize: '14px',
              maxWidth: '250px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Voice Command Active</div>
            <div style={{ fontStyle: 'italic', opacity: 0.8 }}>
              {transcript || 'Listening...'}
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.6 }}>
              Try saying: "Go to projects" or "Open LinkedIn"
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
