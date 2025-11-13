import React from "react";
import { motion } from "framer-motion";
import { Star as StarIcon, User, BookOpen, Clock, Globe } from 'lucide-react';

/**
 * Custom Star Component using DaisyUI's warning color for theme consistency
 */
const Star = ({ filled }) => (
  // Using Tailwind/DaisyUI classes for fill/stroke to match the theme's warning color
  <StarIcon 
    width="18" 
    height="18" 
    className={`
      ${filled ? 'fill-warning stroke-warning' : 'fill-none stroke-base-content/40'}
      transition-colors duration-300
    `}
    aria-hidden
  />
);

/**
 * BookCover component (updated for DaisyUI theme and shadows)
 */
const BookCover = ({ src, title }) => (
  <div className="w-40 md:w-48 lg:w-56 rounded-xl overflow-hidden bg-base-300 shadow-2xl ring-4 ring-warning/20">
    <img 
      src={src} 
      alt={`Cover of ${title}`} 
      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
      loading="lazy" 
    />
  </div>
);

const defaultBook = {
  id: "default-book",
  title: "The Quiet Reader",
  author: "A. Storyteller",
  cover:
    "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=600",
  description:
    "A moving tale about the small moments that change a life. Beautifully written, quietly powerful — the perfect companion for thoughtful evenings.",
  rating: 4.7,
  pages: 304,
  year: 2024,
  buyUrl: "/books/default-book",
};

export default function BookOfTheWeek({ book = defaultBook, onRead, className = "" }) {
  const ratingRounded = Math.round((book.rating ?? 0) * 10) / 10;

  return (
    <section className={`w-11/12 max-w-7xl mx-auto ${className} my-8`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="
          relative rounded-3xl bg-base-100 shadow-2xl overflow-hidden border border-base-300
          transition-colors duration-500
        "
      >
        {/* Subtle background glow/accent */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-warning/10 to-base-100 opacity-50 dark:from-warning/5 dark:to-base-100 pointer-events-none" 
        />
        
        {/* Content Grid */}
        <div className="relative z-10 p-6 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Cover & Motion */}
          <div className="md:col-span-4 flex items-center justify-center">
            <motion.div whileHover={{ scale: 1.05, rotate: 0.5 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
              <BookCover src={book.cover} title={book.title} />
            </motion.div>
          </div>

          {/* Info Block */}
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-2">
                <h4 className="text-sm font-semibold text-warning tracking-widest uppercase">
                    FEATURED READ
                </h4>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-base-content leading-tight mb-2">
              {book.title}
            </h3>
            <p className="mt-1 text-base md:text-lg text-primary font-medium flex items-center">
                <User className="w-5 h-5 mr-2" />
                by {book.author}
            </p>

            <hr className="border-base-300 my-4" />

            {/* Meta Data (Year, Pages, Rating) */}
            <div className="flex flex-wrap items-center gap-6 mb-4 text-base-content/80">
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} filled={(i + 1) <= Math.round((book.rating ?? 0))} />
                        ))}
                    </div>
                    <div className="text-lg font-bold text-warning ml-2">{ratingRounded}</div>
                </div>

                {/* Pages */}
                <div className="flex items-center gap-1 text-sm">
                    <BookOpen className="w-4 h-4 text-primary/80" />
                    {book.pages} pages
                </div>
                
                {/* Year */}
                <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4 text-primary/80" />
                    {book.year}
                </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-base md:text-lg text-base-content/90 max-w-3xl leading-relaxed italic">
                "{book.description}"
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRead ? onRead(book) : (book.buyUrl ? window.open(book.buyUrl, "_blank") : null)}
                // Primary CTA (Strong warning color)
                className="btn btn-warning btn-lg font-bold shadow-md hover:scale-[1.02] transition-transform duration-300"
                aria-label={`Read or buy ${book.title}`}
              >
                Start Reading Now
              </button>

              <a
                href={book.buyUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                // Secondary CTA (Outline style)
                className="btn btn-outline btn-primary btn-md font-semibold"
              >
                <Globe className="w-4 h-4" />
                View Details
              </a>

              {/* Share Buttons (Hidden for brevity, usually placed elsewhere) */}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}