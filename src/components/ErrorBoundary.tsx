import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error('App crashed:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e5e7eb',
          background: '#0b0f14',
          textAlign: 'center',
          padding: '24px'
        }}>
          <div>
            <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Something went wrong.</h1>
            <p style={{ opacity: 0.8, marginBottom: '16px' }}>The app hit a runtime error.</p>
            <button
              onClick={() => {
                localStorage.setItem('disable3D', '1');
                location.reload();
              }}
              style={{
                background: '#7c3aed',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Disable 3D and Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
