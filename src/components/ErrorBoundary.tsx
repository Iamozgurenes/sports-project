import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary yakaladı:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-5 bg-gray-50">
          <div className="max-w-xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="flex justify-center mb-8">
                <div className="inline-flex h-20 w-20 rounded-full bg-red-100 text-red-600 items-center justify-center">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                Beklenmeyen bir hata oluştu
              </h2>

              <p className="text-gray-600 text-center mb-8">
                Uygulama bir sorunla karşılaştı. Sayfayı yenileyerek tekrar deneyebilirsiniz.
              </p>

              {this.state.error && (
                <div className="p-4 bg-gray-100 rounded-lg mb-6 overflow-auto">
                  <p className="font-mono text-sm text-red-600">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                >
                  Sayfayı Yenile
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
