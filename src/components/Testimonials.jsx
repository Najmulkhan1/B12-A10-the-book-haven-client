import React from 'react';
import Stars from './Stars'; // Assuming Stars component exists or I'll use simple icons

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Avid Reader",
            text: "The Book Haven has completely transformed how I track my reading. The community recommendations are spot on!",
            image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Book Club Host",
            text: "Conducting book discussions has never been easier. The platform is intuitive and beautiful.",
            image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Librarian",
            text: "A fantastic resource for discovering hidden gems. I recommend it to all my patrons.",
            image: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];

    return (
        <section className="py-16 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-amber-600 mb-4">Reader Testimonials</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">Hear what our community of book lovers has to say about their experience.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t) => (
                        <div key={t.id} className="card bg-base-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="card-body">
                                <div className="flex items-center gap-4 mb-4">
                                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-bold text-lg text-base-content">{t.name}</h4>
                                        <p className="text-sm text-base-content/60">{t.role}</p>
                                    </div>
                                </div>
                                <p className="text-base-content/80 italic">"{t.text}"</p>
                                {/* Simple stars for now */}
                                <div className="flex gap-1 mt-4 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
