import React from 'react';

const FAQ = () => {
    const faqs = [
        {
            question: "Is The Book Haven free to use?",
            answer: "Yes! You can browse books and read reviews for free. Creating an account to track your books is also completely free."
        },
        {
            question: "How do I add a book to my list?",
            answer: "Simply navigate to the 'Add Book' page after logging in. You can enter the details manually and it will be saved to your collection."
        },
        {
            question: "Can I write reviews?",
            answer: "Absolutely. Once you are logged in, you can leave ratings and detailed reviews for any book in our library."
        },
        {
            question: "How do I update my profile picture?",
            answer: "Go to your Profile page via the user menu. You can update your photo URL and other personal details there."
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-amber-600 mb-4">Frequently Asked Questions</h2>
                    <p className="text-base-content/70">Got questions? We've got answers.</p>
                </div>
                <div className="join join-vertical w-full">
                    {faqs.map((faq, index) => (
                        <div key={index} className="collapse collapse-plus join-item border border-base-300 bg-base-200">
                            <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
                            <div className="collapse-title text-xl font-medium text-amber-600">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p className="text-base-content">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
