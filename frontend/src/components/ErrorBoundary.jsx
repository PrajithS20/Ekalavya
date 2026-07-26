import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#330000', color: 'white', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#ff6666' }}>FATAL ERROR CRASH</h2>
          <p>Please take a screenshot of this error and show it to the AI.</p>
          <hr style={{ borderColor: '#660000', margin: '20px 0' }} />
          <h3 style={{ color: '#ffaaaa' }}>{this.state.error && this.state.error.toString()}</h3>
          <pre style={{ backgroundColor: '#111', padding: '15px', overflowX: 'auto', borderRadius: '5px' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
