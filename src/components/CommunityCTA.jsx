import React from 'react';
import { Link } from 'react-router';

const CommunityCTA = () => {
    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">Ready to Start Your Reading Journey?</h2>
                <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
                    Join thousands of book lovers who are already discovering their next favorite story with The Book Haven.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="btn btn-primary bg-amber-600 hover:bg-amber-700 border-none text-white px-8 btn-lg">
                        Join Community
                    </Link>
                    <Link to="/all-books" className="btn btn-outline border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 btn-lg">
                        Explore Library
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommunityCTA;
