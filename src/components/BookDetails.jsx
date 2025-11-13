import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../hooks/useAxios";

import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Stars from "./Stars";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosInstance(`/books/${id}`).then((data) => {
      setBook(data.data);
      console.log(data);
    });
  }, [axiosInstance, setBook, id]);

  //   const productId = id
  //   axiosInstance(`/comments=${encodeURIComponent(productId)}`)
  //   .then(res => {
  //     console.log(res.data);
  //     setComments(res.data)
  //   })
  // },[axiosInstance, setComments,id])

  // const handleCommentSubmit = async (e) => {
  //   e.preventDefault();
  //   if(!user) return toast.error("please login to comment")

  //   const userName = user.displayName;
  //   const userimg = user.photoURL;
  //   // const review = e.target.review.value;
  //   const comment = e.target.comment.value;

  //   console.log(userName, userimg, comment, rating, id);

  //   const commentData = {
  //     productId: id,
  //     name: userName,
  //     profileImg: userimg,
  //     // rating: rating,
  //     // review: review,
  //     comment: comment,
  //     created_at: new Date(),
  //   };

  //   // optimistic update: immediately show in UI
  //   const tempId = `temp -${Date.now()}`
  //   const optimistic = {...commentData, id: tempId}
  //   setComments(prev => [optimistic, ...prev])
  //   e.target.reset()
  //   toast.success("Comment Posted!")

  //   try {
  //     const res = await axiosInstance.post('/comments', commentData)
  //     const saved = res.data

  //     setComments(prev => prev.map(c => c.id === tempId ? saved:c))
  //   } catch (error) {
  //     console.log(error);

  //   }

  //   // axiosInstance.post("/comments", commentData).then((data) => {
  //   //   console.log(data.data);
  //   //   setComments(data.data)
  //   // });
  // };

  useEffect(() => {
    const productId = id;
    axiosInstance
      .get(`/comments`, {
        params: { productId },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch comments:", err);
        setComments([]);
      });
  }, [axiosInstance, id]);

  useEffect(() => {
    const productId = id;
    axiosInstance
      .get(`/reviews`, {
        params: { productId },
      })
      .then((res) => {
        console.log(res.data);

        setReviews(res.data);
      });
  }, [axiosInstance, id]);
  console.log(reviews);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("please login to comment");

    const userName = user.displayName || "Anonymous";
    const userimg = user.photoURL || "";
    const commentText = e.target.comment.value.trim();
    if (!commentText) return toast.error("Comment empty");

    const commentData = {
      productId: id,
      name: userName,
      profileImg: userimg,
      comment: commentText,
      created_at: new Date().toISOString(),
    };

    // optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimistic = { ...commentData, id: tempId };
    setComments((prev) => [optimistic, ...prev]);
    e.target.reset();
    toast.success("Comment posted (pending save)...");

    try {
      const res = await axiosInstance.post("/comments", commentData);
      console.log("POST /comments response:", res);
      const saved = res.data;

      toast.success("Comment saved!");
    } catch (error) {
      toast.error("Failed to save comment. Try again.", error);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review_text = e.target.review.value;
    const userName = user.displayName || "Anonymous";
    const userimg = user.photoURL || "";

    const newReview = {
      productId: id,
      rating: rating,
      review_text: review_text,
      name: userName,
      image: userimg,
      time: new Date().toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      create_at: new Date(),
    };

    // optimistic update
    const tempId = `temp-${Date.now()}`;
    const optimistic = { ...newReview, id: tempId };
    setReviews((prev) => [optimistic, ...prev]);
    e.target.reset();
    setRating(0);
    toast.success("Comment posted (pending save)...");

    axiosInstance.post("/reviews", newReview).then((res) => {
      console.log(res.data);

      toast.success("Review post");
    });
  };

  const timeAgo = (iso) => {
    try {
      const diff = Date.now() - new Date(iso).getTime();
      const mins = Math.floor(diff / 60000);
      if (mins < 1) return "just now";
      if (mins < 60) return `${mins}m`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h`;
      const days = Math.floor(hrs / 24);
      return `${days}d`;
    } catch {
      return "";
    }
  };
  return (
    <div className="w-11/12 mx-auto mt-4">
      <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
        <div className="max-w-100 max-h-166 rounded-lg  ">
          <img
            className=" h-full w-full object-cover rounded-lg shadow-lg"
            src={book.bookImage}
            alt=""
          />
        </div>
        <div className="relative">
          <h1 className="text-4xl font-semibold">{book.title}</h1>
          <p>by | {book.author}</p>
          <hr className="border-gray-200 shadow my-2" />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Stars value={book.rating} />
            </div>
            
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

      {/* cmt and review section */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* comment section */}
        <div className="md:col-span-8 mt-5  rounded-xl shadow-md">
          <div className="p-4  rounded-md">
            <div>
              <form onSubmit={handleCommentSubmit}>
                <h2 className="font-semibold mt-4 mb-2 text-xl text-amber-500">
                  Comments
                </h2>
                <textarea
                  className="border border-amber-200 w-full  rounded-md py-3 px-3"
                  name="comment"
                  rows="5"
                ></textarea>
                <div>
                  <button
                    type="submit"
                    className="btn bg-amber-600 text-white px-10"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>

            {/* display comments */}

            <div className="flex flex-col gap-4 mt-4">
              {comments.map((c) => (
                <div
                  key={c.id ?? c.created_at}
                  className="flex items-start gap-3 bg-amber-100/20 shadow p-3 rounded-lg"
                >
                  {/* avatar */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden ">
                    {c.profileImg ? (
                      <img
                        src={c.profileImg}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="font-semibold text-amber-600 flex items-center justify-center h-full">
                        {(c.name || "U").charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* text section */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm  break-words whitespace-pre-wrap">
                      {c.comment}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
                      {c.name} • {timeAgo(c.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* review section */}
        <aside className="md:col-span-4 mt-5 p-6 shadow rounded-xl shadow-md">
          {/* Review Form */}
          <form onSubmit={handleReviewSubmit}>
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
                  className="border w-full border-amber-200 rounded-md px-2 py-2"
                  rows={3}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn bg-amber-600 text-white py-2 px-5 mt-3"
              >
                Review
              </button>
            </div>
          </form>

          {/* Display Reviews */}
          <div className="mt-6 space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="user avatar" src={review.image} />
                  </div>
                </div>
                <div className="chat-header">{review.name}</div>
                <div className="chat-bubble">
                  <div className="flex mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < review.rating ? "gold" : "none"}
                        stroke="gold"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    ))}
                  </div>
                  <p>{review.review_text}</p>
                </div>
                <div className="chat-footer">
                  <time className="text-xs opacity-50 ml-2">{review.time}</time>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookDetails;
