'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl font-bold gradient-heading mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-foreground/90">
            <p className="text-lg">
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Introduction</h2>
              <p>
                At Task Manager, we respect your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, and safeguard your information when you use our task management platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account</li>
                <li>Use our task management features</li>
                <li>Contact our support team</li>
                <li>Respond to surveys or communications</li>
              </ul>
              <p>
                This information may include your name, email address, profile information, and any tasks or content you create within the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process and complete transactions</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accessing and updating your information</li>
                <li>Requesting deletion of your data</li>
                <li>Objecting to certain processing activities</li>
                <li>Data portability</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:vk7403654@gmail.com" className="text-primary hover:underline">vk7403654@gmail.com</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:vk7403654@gmail.com" className="text-primary hover:underline">vk7403654@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}