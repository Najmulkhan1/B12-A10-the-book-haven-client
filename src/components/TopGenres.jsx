// TopGenres.jsx
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Hash } from "lucide-react";

/**
 * TopGenres
 * Dynamic, image-focused style using DaisyUI themes.
 */

const defaultGenres = [
  { id: "fiction", name: "Fiction", imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit:crop&q=80&w=800", count: 1240, slug: "fiction" },
  { id: "mystery", name: "Mystery", imageUrl: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit:crop&q=80&w=800", count: 820, slug: "mystery" },
  { id: "romance", name: "Romance", imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit:crop&q=80&w=800", count: 980, slug: "romance" },
  { id: "nonfiction", name: "Nonfiction", imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit:crop&q=80&w=800", count: 640, slug: "nonfiction" },
  { id: "sci-fi", name: "Sci-Fi", imageUrl: "https://images.unsplash.com/photo-1759234008322-70456fcf6aec?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNjaS1GaSUyMGJvb2t8ZW58MHx8MHx8fDA%3D&auto=format&fit:crop&q=60&w=500", count: 520, slug: "sci-fi" },
  { id: "fantasy", name: "Fantasy", imageUrl: "https://images.unsplash.com/photo-1711185892711-cdf27b3b8b54?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZhbnRhc3klMjBib29rfGVufDB8fDB8fHww&auto=format&fit:crop&q=60&w=500", count: 760, slug: "fantasy" },
];

const Card = ({ genre, onClick, LinkComp, linkBase }) => {
  const content = (
    <motion.article
      whileHover={{ translateY: -5 }} // Subtle lift on hover
      className="relative overflow-hidden rounded-xl bg-base-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
      onClick={() => onClick && onClick(genre)}
      role="button"
      aria-label={`Open ${genre.name} genre`}
    >
      {/* Image Area - Full Card Height, Text Overlay */}
      <div className="h-64 w-full bg-base-300 overflow-hidden relative">
        <img
          src={genre.imageUrl}
          alt={genre.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 opacity-80"
          loading="lazy"
        />
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="badge badge-warning font-semibold mb-2">
                <Hash className="w-4 h-4 mr-1" />
                {genre.name}
            </div>
          <h3 className="text-2xl font-extrabold text-white leading-tight mb-2 truncate">
            {genre.name}
          </h3>
          
          <div className="flex justify-between items-center">
            {/* Book Count */}
            {typeof genre.count === "number" && (
                <span className="text-sm font-medium text-white/80 flex items-center">
                    <BookOpen className="w-4 h-4 mr-1 text-warning" />
                    {genre.count.toLocaleString()} Books
                </span>
            )}
            
            {/* Browse Button */}
            <span className="btn btn-xs btn-outline btn-warning text-white flex items-center gap-0.5">
                Browse <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );

  if (LinkComp) {
    const to = `${(linkBase || "/genres").replace(/\/$/, "")}/${genre.slug || genre.id}`;
    return (
      <LinkComp to={to} className="block group" aria-label={`Go to ${genre.name}`}>
        {content}
      </LinkComp>
    );
  }

  return <div className="group">{content}</div>;
};

const TopGenres = ({ genres = defaultGenres, onSelect, linkComponent = null, linkBase = "/genres" }) => {
  return (
    <section className="w-11/12 max-w-7xl mx-auto py-16">
      <header className="mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between border-b-2 pb-4 border-warning/50">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content flex items-center">
            <BookOpen className="w-7 h-7 text-primary mr-3" />
            Explore Top Genres
          </h2>
          <p className="mt-1 text-base text-base-content/80">Jump directly into the most popular categories.</p>
        </div>
        
        {/* View All Button (DaisyUI style) */}
        <button className="btn btn-sm btn-warning font-semibold">
          All Genres
          <ChevronRight className="w-4 h-4" />
        </button>
      </header>

      {/* Grid Layout (Same improved responsiveness) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {genres.map((g) => (
          <Card key={g.id || g.slug || g.name} genre={g} onClick={onSelect} LinkComp={linkComponent} linkBase={linkBase} />
        ))}
      </div>
    </section>
  );
};

export default TopGenres;