import React from 'react';

const Stats = () => {
    const stats = [
        { label: "Active Readers", value: "2,500+" },
        { label: "Books Cataloged", value: "15,000+" },
        { label: "Community Reviews", value: "8,400+" },
        { label: "Daily Visitors", value: "500+" }
    ];

    return (
        <section className="py-12 bg-amber-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2">
                            <div className="text-4xl font-bold">{stat.value}</div>
                            <div className="text-amber-100 uppercase tracking-wide text-sm font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
