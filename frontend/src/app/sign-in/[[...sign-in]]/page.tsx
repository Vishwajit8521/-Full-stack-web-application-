import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Back to home link */}
      <div className="container mx-auto pt-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      
      {/* Sign In Container */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-20"></div>
          
          {/* Card with sign-in form */}
          <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-border/50 w-full max-w-md mx-auto">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold gradient-heading">Welcome Back</h1>
              <p className="text-muted-foreground mt-1">Sign in to continue to your dashboard</p>
            </div>
            
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
}