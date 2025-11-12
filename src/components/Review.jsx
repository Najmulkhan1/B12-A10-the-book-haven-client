import React, { useState } from 'react'

const Review = () => {

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
        <aside>
          <form action="">
            <div>
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

              <div>
                <h2 className="text-xl text-amber-500 font-semibold my-2">
                  Book Review
                </h2>
                <textarea
                  name="review"
                  className="border w-1/2 border-amber-200 rounded-md px-2 py-2"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </form>
        </aside>
    </div>
  )
}

export default Review