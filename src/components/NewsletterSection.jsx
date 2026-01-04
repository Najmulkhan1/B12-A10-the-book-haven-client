
import React from 'react';
import ElegantNewsletter from './ElegantNewsletter';

const NewsletterSection = () => {
    return (
        <section className="py-16 bg-base-100 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
                <h2 className="text-3xl font-bold text-amber-600 mb-4">Stay in the Loop</h2>
                <p className="text-base-content/70 mb-8">
                    Get the latest book recommendations, author interviews, and reading tips delivered straight to your inbox.
                </p>
                <div className="bg-base-200 p-2 rounded-lg shadow-sm inline-block w-full max-w-lg">
                    <ElegantNewsletter />
                </div>
                <p className="text-xs text-base-content/50 mt-4">We respect your privacy. Unsubscribe at any time.</p>
            </div>
        </section>
    );
};

export default NewsletterSection;
