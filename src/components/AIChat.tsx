import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageCircle, FiX } from 'react-icons/fi';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI assistant. Ask me anything about Mayank's work or experience!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Mayank has extensive experience with React and TypeScript, having built multiple production applications.",
        "He's currently working on AI and machine learning projects, focusing on natural language processing.",
        "Mayank is a Tech Lead at GDG and an MLSA, with expertise in full-stack development and cloud technologies.",
        "He's passionate about creating scalable web applications and has worked with technologies like Node.js, Python, and various databases.",
        "Mayank is available for freelance work and collaborations. You can contact him through the contact form on this site."
      ];
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <>
      <motion.button
        className="ai-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(124, 58, 237, 0.5)',
          zIndex: 1000,
        }}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-container"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '350px',
              maxHeight: '60vh',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(25px)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
              border: '1px solid rgba(255, 255, 255, 0.18)',
            }}
          >
            <div
              style={{
                padding: '15px 20px',
                background: 'rgba(0, 0, 0, 0.2)',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#4ade80',
                }}
              />
              AI Assistant
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    background:
                      message.sender === 'user'
                        ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                        : 'rgba(255, 255, 255, 0.1)',
                    color: message.sender === 'user' ? 'white' : '#e5e7eb',
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {message.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              style={{
                padding: '15px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '10px',
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(124, 58, 237, 0.5)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0 20px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(124, 58, 237, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
