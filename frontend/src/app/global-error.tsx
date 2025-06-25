'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Global error occurred
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-destructive/30 to-destructive/10 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-card rounded-2xl p-8 shadow-xl border border-border/50 w-full max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Critical Error</h2>
              <p className="text-muted-foreground mb-6">
                A critical error has occurred. We apologize for the inconvenience.
              </p>
              <div className="flex justify-center">
                <Button onClick={reset} className="flex items-center">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}