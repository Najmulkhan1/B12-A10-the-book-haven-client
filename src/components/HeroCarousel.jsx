import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router"; // Assuming react-router-dom Link
import { BookOpen, Plus, Zap, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"; // Imported Lucide icons

// Empty SVG placeholder for the BookStack (using Lucide icon fallback)
const BookStack = ({ className = "w-36 h-40" }) => (
  <div className={`flex items-center justify-center ${className} text-base-content/40 border-2 border-base-content/10 rounded-lg`}>
      <BookOpen className="w-1/2 h-1/2" />
  </div>
);

const slidesDefault = [
  {
    title: "Your Next Chapter Awaits",
    subtitle:
      "Handpicked books, fresh arrivals, and cozy reads — all in one place.",
    ctaPrimary: { label: "All Books", to: "/books" },
    ctaSecondary: { label: "Create book", to: "/add-book" },
    image: 'https://images.unsplash.com/photo-1604866830893-c13cafa515d5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
  },
  {
    title: "Monthly Bestsellers",
    subtitle: "See what's trending — editor-selected bestsellers this month.",
ctaPrimary: { label: "All Books", to: "/books" },
    ctaSecondary: { label: "View genres", to: "/genres" },
    image: 'https://images.unsplash.com/photo-1667312939934-60fc3bfa4ec0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400'
  },
  {
    title: "Curated Cozy Reads",
    subtitle: "Perfect picks for slow evenings and relaxed weekends.",
    ctaPrimary: { label: "All Books", to: "/books" },
    ctaSecondary: { label: "My list", to: "/my-list" },
    image: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400'
  },
  {
    title: "Editor’s Picks & New Releases",
    subtitle: "Fresh titles and staff favorites — stay inspired.",
    ctaPrimary: { label: "All Books", to: "/books" },
    ctaSecondary: { label: "Contact Us", to: "/contact" },
    image: 'https://images.unsplash.com/photo-1556566952-11eff3d06ed4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJvb2tzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=400'
  },
];

const Dot = ({ active, goTo, index }) => (
  <button
    onClick={() => goTo(index)}
    aria-label={`Go to slide ${index + 1}`}
    className={`w-3 h-3 rounded-full transition-all duration-300 ${
      active ? "bg-warning shadow-md shadow-warning/50 scale-110" : "bg-base-content/40 hover:bg-base-content/60"
    }`}
  />
);

const HeroCarousel = ({ slides = slidesDefault, interval = 3600 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slidesCount = slides.length;
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const slideData = slides[index];

  useEffect(() => {
    if (paused) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / interval) * 100);
      if (progressRef.current) progressRef.current.style.width = `${pct}%`;
      if (elapsed >= interval) setIndex((i) => (i + 1) % slidesCount);
    };
    timerRef.current = setInterval(tick, 80);
    return () => clearInterval(timerRef.current);
  }, [paused, index, interval, slidesCount]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      requestAnimationFrame(() => {
        if (progressRef.current) {
          progressRef.current.style.transition = "width 0.12s linear";
        }
      });
    }
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + slidesCount) % slidesCount);
  const next = () => setIndex((i) => (i + 1) % slidesCount);
  const goTo = (i) => setIndex(i % slidesCount);

  return (
    <section className="w-11/12 max-w-7xl mx-auto py-12">
      <div className="relative overflow-hidden min-h-[30rem] rounded-3xl bg-base-200 shadow-2xl">
        
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_top,_#000,_transparent)]">
            <div className="h-full w-full bg-primary/20 blur-3xl mix-blend-multiply animate-pulse" />
        </div>
        
        <div className="absolute inset-x-0 top-0 h-1 bg-base-content/10 z-20">
          <div ref={progressRef} className="h-full bg-warning w-0 transition-all" style={{ width: "0%" }} />
        </div>

        <div
          className="relative z-10 p-6 md:p-12 h-full bg-base-300/60 backdrop-blur-md border border-base-content/10 transition-colors duration-300"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 order-2 md:order-1">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-base-content">
                    {slideData.title}
                  </h1>
                  <p className="mt-4 max-w-xl text-base-content/80 text-base md:text-xl">
                    {slideData.subtitle}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      to={slideData.ctaPrimary?.to || "/all-books"}
                      className="btn bg-amber-600 btn-lg font-bold shadow-lg shadow-amber-600/30 hover:scale-[1.02]  transition-transform"
                    >
                      {slideData.ctaPrimary?.label || "Browse books"}
                    </Link>

                    <Link
                      to={slideData.ctaSecondary?.to || "/create-book"}
                      className="btn btn-ghost text-base-content hover:bg-base-content/10"
                    >
                      {slideData.ctaSecondary?.label || "Create book"}
                    </Link>
                  </div>

                  <div className="mt-10 flex gap-8 text-sm text-base-content/70 items-center border-t border-base-content/10 pt-6">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shadow-inner">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-base-content">Curated</div>
                        <div className="text-xs">Editor picks</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center shadow-inner">
                        <Zap className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold text-base-content">
                          Fast Updates
                        </div>
                        <div className="text-xs">New releases daily</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-5 order-1 md:order-2 flex items-center justify-center relative min-h-[16rem]">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-sm aspect-[3/4] rounded-2xl bg-base-100 p-4 shadow-2xl shadow-base-content/20 flex items-center justify-center overflow-hidden"
                whileHover={{ y: -8, rotate: 1 }}
              >
                {slideData.image ? (
                  <img
                    src={slideData.image}
                    alt={slideData.title}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <BookStack className="w-36 h-36" />
                )}
              </motion.div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => prev()}
                aria-label="Previous slide"
                className="btn btn-ghost btn-circle text-base-content/80 hover:bg-base-content/20 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => next()}
                aria-label="Next slide"
                className="btn btn-ghost btn-circle text-base-content/80 hover:bg-base-content/20 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-base-content/60 font-medium">
                <span className="text-lg font-bold text-base-content/90">{index + 1}</span> / {slidesCount}
              </div>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <Dot key={i} active={i === index} goTo={goTo} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;