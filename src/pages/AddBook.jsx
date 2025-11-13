import React from "react";
import BackButton from "../components/BackButton";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const AddBook = () => {
  const { user } = useAuth();

  const axiosInstance = useAxios();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const authorImg = form.authorImg.value;
    const category = form.category.value;
    const rating = form.rating.value;
    const summary = form.summary.value;
    const bookImage = form.bookImage.value;
    const userEmail = form.email.value;
    const userName = form.name.value;
    console.log(
      title,
      author,
      authorImg,
      category,
      rating,
      summary,
      bookImage,
      userEmail,
      userName
    );

    const newBook = {
      title: title,
      author: author,
      authorImg: authorImg,
      category: category,
      rating: parseFloat(rating),
      summary: summary,
      bookImage: bookImage,
      userEmail: userEmail,
      userName: userName,
      created_at: new Date(),
    };

    axiosInstance.post("books", newBook).then((data) => {
      console.log(data.data);
    });
  };

  return (
    <div className="w-11/12 mx-auto min-h-screen py-10">
      <div className="flex justify-center">
        {/* The main container is styled as a card */}
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl border border-base-200">
          <div className="card-body p-4 sm:p-8">
            {/* Header with Back Button and Title */}
            <div className="flex items-center justify-center relative mb-6 border-b border-base-200 pb-4">
              {/* Back Button position (absolute for layout) */}
              <div className="absolute left-0">
                <Link to="/">
                  <BackButton />
                </Link>
              </div>

              {/* Center Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                Add New Book 📖
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Title and Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="title"
                    required
                  />
                </div>

                {/* Author Field */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      Author
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    name="author"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Author Image URL (Full Width) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content/80">
                    Author Image URL
                  </span>
                  <span className="label-text-alt text-base-content/50">
                    (optional)
                  </span>
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  name="authorImg"
                />
              </div>

              {/* Row 3: Genre Category and Rating */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Genre Select */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      Genre
                    </span>
                  </label>
                  <select
                    name="category"
                    className="select select-bordered w-full"
                    defaultValue="1"
                    required
                  >
                    <option value="1" disabled>
                      -- Select Genre --
                    </option>
                    <option value="Classic Fiction">Classic Fiction</option>
                    <option value="Historical Fiction">Historical Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Romance">Romance</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Philosophical Fiction">
                      Philosophical Fiction
                    </option>
                    <option value="Psychological Fiction">
                      Psychological Fiction
                    </option>
                    <option value="Gothic Fiction">Gothic Fiction</option>
                    <option value="Gothic Romance">Gothic Romance</option>
                    <option value="Magical Realism">Magical Realism</option>
                    <option value="Epic Poetry">Epic Poetry</option>
                    <option value="Classic Epic">Classic Epic</option>
                    <option value="Tech Thriller">Tech Thriller</option>
                    <option value="Drama">Drama</option>
                    <option value="Coming-of-Age Fiction">
                      Coming-of-Age Fiction
                    </option>
                    <option value="Southern Gothic">Southern Gothic</option>
                    <option value="Modernist Fiction">Modernist Fiction</option>
                    <option value="Dystopian Fiction">Dystopian Fiction</option>
                  </select>
                </div>

                {/* Rating Input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      Rating (1-5)
                    </span>
                  </label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    name="rating"
                    min="1"
                    max="5"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Summary (Full Width Textarea) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content/80">
                    Summary
                  </span>
                </label>
                <textarea
                  name="summary"
                  required
                  rows="3"
                  className="textarea textarea-bordered h-32 w-full"
                  placeholder="Enter a brief summary of the book"
                ></textarea>
              </div>

              {/* Row 5: Book Cover Image (Full Width) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium text-base-content/80">
                    Book Cover Image URL
                  </span>
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  name="bookImage"
                />
              </div>

              {/* Row 6: User Info (Read-Only) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      User Email (Read-only)
                    </span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full input-disabled bg-base-200"
                    name="email"
                    defaultValue={user?.email}
                    readOnly
                  />
                </div>
                {/* User Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base font-medium text-base-content/80">
                      User Name (Read-only)
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full input-disabled bg-base-200"
                    name="name"
                    defaultValue={user?.displayName}
                    readOnly
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-8 shadow-md hover:shadow-lg transition-shadow"
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBook;