import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-primary">About Book Haven</h1>
                    <p className="text-lg text-gray-600">Your sanctuary for discovering, tracking, and reviewing your favorite books.</p>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Our Mission</h2>
                        <p>
                            At Book Haven, we believe that every book has a soul and every reader deserves a place to connect with stories that matter.
                            Our platform is designed to help you organize your reading life, discover new gems, and share your thoughts with a community
                            of like-minded bibliophiles.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl">For Readers</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Track your reading progress</li>
                                <li>Rate and review books</li>
                                <li>Create custom reading lists</li>
                                <li>Discover trending titles</li>
                            </ul>
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl">Community</h2>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>Share reviews with others</li>
                                <li>See what others are reading</li>
                                <li>Join book discussions</li>
                                <li>Connect with fellow readers</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
