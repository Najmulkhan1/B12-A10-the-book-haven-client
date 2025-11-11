import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxios from "../hooks/useAxios";
import { ListStart, Star } from "lucide-react";
import Review from "./Review";

const BookDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    axiosInstance(`/books/${id}`).then((data) => {
      setBook(data.data);
      console.log(data);
    });
  }, [axiosInstance, setBook, id]);

  return (
    <div className="w-11/12 mx-auto mt-4">
      <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-lg">
          <img className="rounded-lg" src={book.bookImage} alt="" />
        </div>
        <div className="relative">
          <h1 className="text-4xl font-semibold">{book.title}</h1>
          <p>by | {book.author}</p>
          <hr className="border-gray-200 shadow my-2" />
          <div className="flex items-center gap-2">
            <p className="text-xl">{book.rating} </p>
            <Star fill="yellow" className="text-yellow-400"></Star>
          </div>

          <button className="absolute top-3 right-2 bg-amber-200 py-1 px-3 rounded-full border font-semibold text-black border-amber-300">
            {book.category}
          </button>

          <div>
            <p className="line-clamp-4">{book.summary}</p>
            <a href="#boo" to={"boo"} className="text-blue-500">
              See more....
            </a>
          </div>
          <div className="mt-3">
            <button className="btn w-full">Add to Read</button>
          </div>
        </div>
      </div>

      <div id="boo" className="mt-4 border p-4 border-gray-300 rounded-lg">
        <h1 className="text-2xl font-semibold label">Summary</h1>
        <hr className="text-gray-400 my-3" />
        <p>
          <span className="text-2xl font-semibold text-gray-600">
            {book.title} :{" "}
          </span>{" "}
          {book.summary}
        </p>
      </div>

      <div>
        <Review></Review>

        <div>
          <div className="border p-4 border-gray-300 rounded-md">
            <div>
              <form>
                <div className="flex items-center gap-4 mt-6">
                    <h2 className="font-semibold text-2xl mb-3">Rating</h2>

                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = i + 1;
                    const filled = hoverRating
                      ? value <= hoverRating
                      : value <= rating;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        onMouseEnter={() => setHoverRating(value)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={filled ? "gold" : "none"}
                          stroke="gold"
                          className="w-8 h-8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      </button>
                    );
                  })}
                  <span className="ml-2 text-sm text-gray-600">
                    {rating ? `${rating}/5` : ""}
                  </span>
                </div>
                </div>
                

                <h2 className="font-semibold mb-2">Comments</h2>
                <textarea
                  className="border w-full border-gray-300 rounded-md py-3 px-3"
                  name=""
                  rows="5"
                ></textarea>
                <div>
                  <button className="btn bg-amber-600 text-white px-10">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
