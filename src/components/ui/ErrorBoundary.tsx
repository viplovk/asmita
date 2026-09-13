import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#241711] text-[#F3EBDD] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 rounded-2xl bg-[#3A241B] border border-[#B08A45]/40 shadow-2xl">
            <h2 className="text-2xl font-serif-display font-light text-[#E8D7B8] mb-3">
              ASMITA 2026
            </h2>
            <p className="text-sm text-[#D8C19A] mb-6">
              A temporary display error occurred. Please refresh to load the cultural celebration.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B08A45] to-[#8E3F2C] text-[#F3EBDD] font-cinzel text-xs tracking-wider uppercase shadow-md hover:opacity-90 transition-opacity"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
