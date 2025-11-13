import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Star, TrendingUp, User, Crown, Feather, BookOpen } from 'lucide-react'; 
import { Link } from 'react-router';

const TopRated = () => {
    const axiosInstance = useAxios();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Data Fetching remains the same
    useEffect(() => {
        axiosInstance.get('/top-rated')
        .then(res => {
            console.log(res.data);
            setBooks(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to fetch top-rated books:", err);
            setLoading(false);
        });
    }, [axiosInstance]);

    // Loading State
    if (loading) {
        return (
            <div className="w-full min-h-[300px] flex items-center justify-center mt-10 mx-auto max-w-7xl bg-base-100 rounded-box shadow-xl">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }
    
    // Empty State
    if (books.length === 0) {
        return (
            <div className="w-11/12 mx-auto mt-10 p-8 text-center bg-base-100 rounded-xl shadow-xl transition-colors max-w-7xl">
                <h2 className="text-3xl font-bold text-base-content">No Top Rated Books Found 😔</h2>
                <p className="mt-4 text-lg text-gray-500">
                    It seems there are no top-rated books to display at the moment.
                </p>
                <BookOpen className="w-16 h-16 text-warning mx-auto mt-6" />
            </div>
        );
    }

    // --- Luxury Minimalist DaisyUI Themed Design with Grid ---
    return (
        <div className='w-11/12 max-w-7xl mx-auto mt-16 p-8 bg-base-100 rounded-3xl shadow-2xl border border-base-200'>
            
            {/* Header */}
            <h2 className="text-5xl font-light text-base-content mb-3 text-center tracking-wider">
                Elite Collection
            </h2>
            <div className="flex items-center justify-center mb-10">
                <Crown className="w-6 h-6 text-warning mr-2" fill="currentColor" />
                <span className="text-2xl font-semibold text-warning">Top-Rated Selections</span>
                <Crown className="w-6 h-6 text-warning ml-2" fill="currentColor" />
            </div>
            
            {/* Books Grid - Key Change Here for Responsiveness */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map((book, index) => (
                    // Card structure is now a vertical card for the grid
                    <div 
                        key={book.id || index} 
                        className="card bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-t-4 border-warning"
                    >
                        {/* 1. Image and Rank */}
                        <figure className="relative h-64 overflow-hidden">
                            <img 
                                src={book.bookImage} 
                                alt={book.title} 
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            
                            {/* Large Rank Number Badge */}
                            <div className="absolute bottom-2 right-2 text-warning opacity-90 backdrop-blur-sm bg-base-100/30 rounded-full w-14 h-14 flex items-center justify-center border-2 border-warning shadow-lg">
                                <span className="text-xl font-extrabold text-base-content">#{index + 1}</span>
                            </div>
                        </figure>

                        {/* 2. Content */}
                        <div className="card-body p-6">
                            <h3 className="card-title text-base-content text-2xl mb-1 line-clamp-2">
                                {book.title}
                            </h3>
                            
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-2 border-b border-base-300 pb-2">
                                <p className="flex items-center font-medium text-base-content/80">
                                    <Feather className="w-4 h-4 mr-1 text-primary" />
                                    {book.author || "Unknown Author"}
                                </p>
                            </div>
                            
                            {/* Summary */}
                            <p className="text-sm text-base-content/80 line-clamp-3 mb-4">
                                {book.summary || "No summary available for this book."}
                            </p>

                            {/* Rating & Action Row (Bottom) */}
                            <div className="flex items-center justify-between">
                                {/* Rating Display */}
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-extrabold text-warning">
                                        {book.rating ? book.rating : 'N/A'}
                                    </span>
                                    
                                    <div className="flex items-center space-x-0.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    (book.rating && i < Math.round(book.rating)) 
                                                    ? 'fill-warning stroke-warning' 
                                                    : 'fill-none stroke-base-content/40'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Action/Link Button */}
                                <Link to={`/books-details/${book._id}`} className="btn btn-warning btn-outline btn-sm font-semibold">
                                    Read Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default TopRated;