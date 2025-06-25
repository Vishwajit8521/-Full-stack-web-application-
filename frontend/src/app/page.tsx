import Link from 'next/link';
import { auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';

export default function Home() {
  const { userId } = auth();

  // If the user is logged in, redirect to the dashboard
  if (userId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="mb-6">You're already logged in.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold gradient-heading leading-tight">
                Manage Tasks <br />
                <span className="text-foreground">With AI Assistance</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Streamline your productivity with our intelligent task management platform.
                Let AI help you organize, prioritize, and accomplish more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30"></div>
              <div className="relative bg-card rounded-2xl p-6 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg animate-slide-up">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Complete project proposal</span>
                    </div>
                    <span className="text-sm text-muted-foreground">High Priority</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-primary mr-2" />
                      <span>Research market trends</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Medium Priority</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent/20 rounded-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-accent mr-2" />
                      <span>AI Generated: Prepare presentation</span>
                    </div>
                    <span className="text-sm text-muted-foreground">AI Suggested</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our task management platform combines intuitive design with AI capabilities to help you work smarter.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-muted-foreground">Create, organize, and track your tasks with ease. Set priorities and deadlines to stay on top of your work.</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistance</h3>
              <p className="text-muted-foreground">Let our AI suggest tasks based on your goals and habits. Get smart recommendations to improve your productivity.</p>
            </div>
            
            <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted-foreground">Visualize your progress with intuitive charts and statistics. Celebrate your achievements and stay motivated.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary/10 via-background to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who have transformed their workflow with our task management platform.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="group">
              Get Started for Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold gradient-heading">Task Manager</h3>
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6">
              <div className="flex flex-col items-center md:items-start">
                 <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                   Privacy Policy
                 </Link>
                 <p className="text-xs text-muted-foreground mt-1 max-w-[200px] text-center md:text-left">Our commitment to protecting your personal information</p>
               </div>
               <div className="flex flex-col items-center md:items-start">
                 <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                   Terms of Service
                 </Link>
                 <p className="text-xs text-muted-foreground mt-1 max-w-[200px] text-center md:text-left">Guidelines for using our task management platform</p>
               </div>
               <div className="flex flex-col items-center md:items-start">
                 <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                   Contact
                 </Link>
                 <p className="text-xs text-muted-foreground mt-1 max-w-[200px] text-center md:text-left">
                   <a href="mailto:vk7403654@gmail.com" className="hover:text-primary transition-colors">vk7403654@gmail.com</a>
                 </p>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}