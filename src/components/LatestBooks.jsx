import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";
import { Link } from "react-router"; 
import { Bookmark, ChevronRight, Hash, User } from "lucide-react";
import Loading from "./Loading";

const LatestBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/latest-books")
      .then((data) => {
        setBooks(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching latest books:", error);
        setLoading(false);
      });
  }, [axiosInstance]);
  
  // Loading State UI
  if (loading) {
    return <Loading></Loading>
  }

  // --- NEW UI: Stacked Info Card Style ---
  return (
    <div className="w-11/12 max-w-7xl mx-auto py-16">
      <div className="space-y-10">
        
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row items-center justify-between pb-5 border-b border-amber-600/30">
          <div>
            <h1 className="text-4xl font-extrabold text-base-content flex items-center gap-3">
              <Bookmark className="w-7 h-7 text-amber-600" />
              New Releases
            </h1>
            <p className="mt-1 text-base text-base-content/70">
              The newest books added to our digital shelves.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link to={'/all-books'} className="btn border border-amber-600 hover:text-white hover:bg-amber-600 font-semibold">
                See All
                <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </header>

        {/* Info Bar */}
        <div className="text-lg font-medium text-base-content/80">
            Showing <span className="font-extrabold text-warning">{books.length}</span> fresh titles.
        </div>

        {/* Book Grid (Responsive) */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {books.map((b, index) => (
              <motion.div
                key={b._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                whileHover={{ translateY: -5 }} 
                className="group"
              >
                {/* Card Container: Two-part structure */}
                <div className="relative overflow-hidden rounded-xl bg-base-100 shadow-md border-2 border-base-300 transition-all duration-300 h-full flex flex-col">
                  
                  {/* Top Part: Cover (bg-base-300 for contrast) */}
                  <div className="aspect-[2/3] w-full bg-base-300 overflow-hidden relative">
                    {b.bookImage ? (
                      <img
                        src={b.bookImage}
                        alt={`Cover of ${b.title}`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-base-content/40">No cover</div>
                    )}
                    <span className="badge badge-sm badge-warning absolute top-2 right-2 font-bold">New</span>
                  </div>

                  {/* Bottom Part: Info (bg-base-100) */}
                  <div className="p-4 flex flex-col flex-grow">
                    
                    <h3 className="text-base font-extrabold leading-snug text-base-content line-clamp-2">{b.title}</h3>
                    <p className="mt-1 text-sm text-base-content/70 flex items-center gap-1 flex-grow">
                        <User className="w-4 h-4 text-primary/80" />
                        {b.author}
                    </p>

                    <div className="mt-3 flex flex-col gap-2 border-t border-base-300 pt-3">
                      {/* Category */}
                      <span className="text-xs font-semibold text-primary flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          {b.category || 'General'}
                      </span>
                        
                      {/* Link Button */}
                      <Link
                        to={`/books-details/${b._id}`}
                        className="btn btn-sm btn-warning font-semibold transition-all"
                        aria-label={`View details for ${b.title}`}
                      >
                        Check Details
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
            <div className="text-center text-base-content/60 py-12">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-base-content/40" />
                No new releases found at this time.
            </div>
        )}
      </div>
    </div>
  );
};

export default LatestBooks;