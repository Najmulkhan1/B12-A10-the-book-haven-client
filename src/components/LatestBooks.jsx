import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";

const LatestBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/latest-books").then((data) => {
      setBooks(data.data);
      console.log(data);
    });
  }, [axiosInstance]);

  return (
    <div className="w-11/12 mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold text-center mt-4">Latest Books</h1>
        <p className="text-sm text-center text-gray-500">
          Discover our newest arrivals — fresh stories, powerful ideas, and
          inspiring journeys waiting to be read.
        </p>

        <div>
          <h2>Total: {books.length}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <motion.article
                key={book._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-4 text-black bg-gray-50 rounded-xl cursor-pointer"
                // onClick={() => onSelectBook && onSelectBook(book)}
                aria-label={`Open ${book.title} by ${book.author}`}
              >
                <div className="w-20 h-28 flex-shrink-0 overflow-hidden rounded-md bg-gray-200 flex items-center justify-center">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-gray-500 px-2 text-center">
                      No cover
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">by: {book.author}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <time dateTime={book.addedAt}>
                      {/* {formatDate(book.addedAt)} */}
                    </time>
                    <span className="px-2 py-0.5 bg-white rounded-full border text-gray-600">
                      New
                    </span>
                  </div>
                </div>
              </motion.article>

              // <div className="card bg-base-100  shadow-sm">
              //   <figure className="px-10 pt-10">
              //     <img
              //       src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              //       alt="Shoes"
              //       className="rounded-xl"
              //     />
              //   </figure>
              //   <div className="card-body items-center text-center">
              //     <h2 className="card-title">{book.title}</h2>
              //     <p>
              //       {book.summary}
              //     </p>
              //     <div className="card-actions">
              //       <button className="btn btn-primary">Buy Now</button>
              //     </div>
              //   </div>
              // </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestBooks;
