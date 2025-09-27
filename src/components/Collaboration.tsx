import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiUser, FiSend, FiUsers } from 'react-icons/fi';

// Mock data for demonstration
const MOCK_COMMENTS = [
  { id: 1, name: 'Visitor 1', text: 'Amazing portfolio! Love the design.', timestamp: '2 minutes ago' },
  { id: 2, name: 'Recruiter', text: 'Impressive work! Are you open to new opportunities?', timestamp: '10 minutes ago' },
];

// Mock active users
const MOCK_ACTIVE_USERS = [
  { id: 1, name: 'Recruiter', position: 'San Francisco, CA' },
  { id: 2, name: 'Developer', position: 'New York, NY' },
  { id: 3, name: 'Designer', position: 'Remote' },
];

export default function Collaboration() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [activeUsers, setActiveUsers] = useState(MOCK_ACTIVE_USERS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      name: 'You',
      text: comment,
      timestamp: 'Just now',
    };

    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '120px', zIndex: 1000 }}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          border: 'none',
          color: 'white',
          fontSize: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(245, 158, 11, 0.5)',
          position: 'relative',
        }}
      >
        <FiMessageSquare />
        <motion.span
          style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#ef4444',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {activeUsers.length}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '0',
              width: '350px',
              height: '500px',
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(25px)',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
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
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveTab('chat')}
                  style={{
                    background: activeTab === 'chat' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  style={{
                    background: activeTab === 'users' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '5px 15px',
                    borderRadius: '15px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <FiUsers /> {activeUsers.length}
                </button>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
              >
                <FiX />
              </button>
            </div>

            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {activeTab === 'chat' ? (
                <>
                  <div
                    style={{
                      flex: 1,
                      overflowY: 'auto',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      gap: '15px',
                    }}
                  >
                    {[...comments].reverse().map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '15px',
                          padding: '12px 15px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '5px',
                          }}
                        >
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              color: 'white',
                              flexShrink: 0,
                            }}
                          >
                            <FiUser />
                          </div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{msg.name}</div>
                          <div style={{ opacity: 0.6, fontSize: '12px' }}>{msg.timestamp}</div>
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.text}</div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    style={{
                      padding: '15px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a comment..."
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
                        e.target.style.borderColor = 'rgba(245, 158, 11, 0.5)';
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
                        background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
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
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(245, 158, 11, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <FiSend />
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ padding: '20px', overflowY: 'auto' }}>
                  <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#f59e0b' }}>
                    Active Visitors ({activeUsers.length})
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {activeUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: user.id * 0.1 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 15px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      >
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '16px',
                            fontWeight: 'bold',
                          }}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', fontSize: '14px' }}>{user.name}</div>
                          <div style={{ fontSize: '12px', opacity: 0.7 }}>{user.position}</div>
                        </div>
                        <div
                          style={{
                            marginLeft: 'auto',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: '#4ade80',
                            boxShadow: '0 0 10px #4ade80',
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
