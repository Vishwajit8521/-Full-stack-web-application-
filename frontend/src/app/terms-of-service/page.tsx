'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="bg-card rounded-xl p-8 shadow-sm border border-border/50 animate-fade-in">
          <h1 className="text-3xl font-bold gradient-heading mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-foreground/90">
            <p className="text-lg">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Task Manager platform, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">2. Description of Service</h2>
              <p>
                Task Manager provides a task management platform that allows users to create, organize, and track tasks. 
                We may update, modify, or enhance the service at any time without prior notice.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">3. User Accounts</h2>
              <p>
                To use certain features of our service, you must create an account. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Providing accurate and complete information</li>
                <li>Promptly updating your information if it changes</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">4. User Content</h2>
              <p>
                You retain ownership of any content you submit to the service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display your content for the purpose of operating and improving the service.
              </p>
              <p>
                You are solely responsible for your content and must not submit content that:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violates any applicable law or regulation</li>
                <li>Infringes on the rights of others</li>
                <li>Is harmful, fraudulent, deceptive, or offensive</li>
                <li>Contains malware or other harmful code</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">5. Intellectual Property</h2>
              <p>
                The Task Manager service, including its design, features, and content (excluding user content), is owned by us and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our service without our explicit permission.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service, regardless of whether we have been informed of the possibility of such damages.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
              <p>
                We may modify these Terms of Service at any time. We will notify users of significant changes by posting a notice on our website or sending an email. Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">8. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">9. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at <a href="mailto:vk7403654@gmail.com" className="text-primary hover:underline">vk7403654@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}