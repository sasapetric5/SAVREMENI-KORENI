import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

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
    console.error('Uncaught runtime error in component tree:', error, errorInfo);
  }

  private handleReload = () => {
    try {
      localStorage.removeItem('savremeni_koreni_user_photos_v1');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let isEn = false;
      try {
        isEn = localStorage.getItem('savremeni_koreni_language') === 'en';
      } catch {
        // ignore
      }

      return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#241D19] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E8E0D5] shadow-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#9E3E26]/10 text-[#9E3E26] flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold text-[#241D19]">
                Savremeni Koreni
              </h2>
              <p className="text-sm text-[#241D19]/75">
                {isEn 
                  ? 'A temporary error occurred while rendering the page.' 
                  : 'Došlo je do privremenog problema pri učitavanju prikaza.'
                }
              </p>
            </div>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#9E3E26] hover:bg-[#7F2F1C] text-white font-medium text-sm transition-all shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{isEn ? 'Refresh Page' : 'Osveži stranicu'}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

