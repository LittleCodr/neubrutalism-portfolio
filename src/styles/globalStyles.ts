// Add global styles for the application
export const addGlobalStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    /* Smooth scroll behavior */
    html {
      scroll-behavior: smooth;
    }
    
    /* Custom scrollbar for the entire app */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
      background: linear-gradient(135deg, var(--gradient-1), var(--gradient-2));
      border-radius: 10px;
      transition: all 0.3s ease;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(135deg, var(--gradient-4), var(--gradient-5));
    }
    
    /* Custom selection color */
    ::selection {
      background: rgba(124, 58, 237, 0.3);
      color: white;
    }
    
    /* Custom focus styles */
    *:focus {
      outline: 2px solid rgba(124, 58, 237, 0.5);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(styleElement);
};
