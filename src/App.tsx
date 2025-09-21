function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0b0f14', 
      color: '#e5e7eb', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#7c3aed', fontSize: '48px', textAlign: 'center' }}>
        Mayank Agrawal
      </h1>
      <p style={{ textAlign: 'center', fontSize: '20px', marginBottom: '40px' }}>
        Portfolio - React is Working!
      </p>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <section style={{ marginBottom: '40px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <h2 style={{ color: '#06b6d4' }}>About</h2>
          <p>Tech Lead @GDG | MLSA | Google Cloud Arcade Facilitator 2025</p>
          <p>LLMs & Symbolic AI | Full-Stack, Android & iOS Dev | Automation, Web3 & Scalable Systems</p>
        </section>
        
        <section style={{ marginBottom: '40px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <h2 style={{ color: '#22c55e' }}>Skills</h2>
          <p>React, TypeScript, Node.js, Python, AI/ML, Mobile Development</p>
        </section>
        
        <section style={{ marginBottom: '40px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
          <h2 style={{ color: '#f43f5e' }}>Contact</h2>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/littlecodr/" style={{ color: '#7c3aed' }}>littlecodr</a></p>
          <p>GitHub: <a href="https://github.com/LittleCodr" style={{ color: '#7c3aed' }}>LittleCodr</a></p>
          <p>Twitter: <a href="https://x.com/mindflayer_69" style={{ color: '#7c3aed' }}>mindflayer_69</a></p>
        </section>
      </div>
    </div>
  );
}

export default App;