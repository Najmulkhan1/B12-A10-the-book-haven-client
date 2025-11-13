import React, { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Stars from "../components/Stars";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Search } from "lucide-react";

const MyBooks = () => {
  const { user, loading } = useAuth();
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState(null);
  const editBookRef = useRef();
  const [isDataLoading, setIsDataLoading] = useState(true);

  console.log("token", user.accessToken);

  // Fetch user-specific books (Functionality preserved)
  useEffect(() => {
    setIsDataLoading(true);
    if (!user?.email) return;
    axiosInstance
      .get(`/my-books?email=${encodeURIComponent(user.email)}`, {
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [axiosInstance, user?.email, user]);

  // Handle Delete (Functionality preserved)
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;
      try {
        const res = await axiosInstance.delete(`/books/${id}`);
        console.log(res.data);

        setBooks((prev) => prev.filter((b) => b._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Could not delete the book. Try again.",
          icon: "error",
        });
      }
    });
  };

  // Handle Edit (Functionality preserved)
  const handleEdit = (id) => {
    const findBook = books.find((b) => b._id === id);
    if (!findBook) {
      console.log("book not found", id);
      return;
    }

    setEdit({ ...findBook });

    editBookRef.current.showModal();
    console.log(id);
  };

  // Handle Form Submission for Edit (Functionality preserved)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const id = edit?._id;

    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const authorImg = form.authorImg.value;
    const category = form.category.value;
    const rating = Number(parseFloat(form.rating.value).toFixed(1));

    const summary = form.summary.value;
    const bookImage = form.bookImage.value;
    const userEmail = form.email.value;
    const userName = form.name.value;

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
    };

    try {
      await axiosInstance.put(`/books/${id}`, newBook);
      // const updated = res.data;

      setBooks((prev) =>
        prev.map((b) => (b._id === id ? { ...b, ...newBook } : b))
      );

      Swal.fire({
        title: "Updated!",
        text: "Book updated successfully.",
        icon: "success",
      });

      if (editBookRef.current) editBookRef.current.close();
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire({
        title: "Error",
        text: "Could not update the book. Try again.",
        icon: "error",
      });
    }
  };

  // Search Handler (Functionality preserved)
  const handleSearch = (e) => {
    e.preventDefault();

    setIsDataLoading(true);

    const search_text = e.target.search.value;

    axiosInstance.get(`/search?search=${search_text}`).then((res) => {
      setBooks(res.data);
      setIsDataLoading(false);
    });
  };

  if (loading || isDataLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <header className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content">
            📖 My Books
          </h1>

          {/* Search and Sort (Styled with DaisyUI inputs/select) */}
          <form
            onSubmit={handleSearch}
            className="order-1 sm:order-2 w-full max-w-lg"
          >
            <div className="relative flex w-full ">
              {/* 🔍 Search Icon */}
              <Search
                className="absolute left-3 top-1/2 z-50 -translate-y-1/2 text-base-content/60"
                size={18}
              />

              {/* 🔎 Input Field */}
              <input
                type="search"
                name="search"
                placeholder="Search book title..."
                // DaisyUI classes for input
                className="input input-bordered w-full rounded-r-none pl-10 pr-4 bg-base-100 text-base-content shadow-md focus:ring-1 focus:ring-primary focus:border-primary"
              />

              {/* 🔘 Search Button */}
              <button
                type="submit"
                className="btn bg-amber-600 text-white rounded-l-none font-medium shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </form>
        </header>

        <hr className="border-t border-base-300 mb-6" />

        <div className="mt-4 md:mt-6">
          {books.length === 0 ? (
            <div
              key={books._id}
              className="text-center py-20 bg-base-100 rounded-lg shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-base-content/80">
                You haven't added any books yet.
              </h2>
              <p className="text-base-content/60 mt-2">
                Click{" "}
                <Link
                  to="/add-book"
                  className="text-primary font-medium hover:underline"
                >
                  Add Book
                </Link>{" "}
                to get started!
              </p>
            </div>
          ) : (
            <>
              {/* TABLE - shown on md and above (Using DaisyUI table classes) */}
              <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg bg-base-100 border border-base-300">
                <table className="table w-full">
                  <thead>
                    <tr className="bg-base-200">
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-base-content/80 min-w-[200px]">
                        Book
                      </th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                        Author
                      </th>
                      <th className="text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                        Genre
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                        Rating
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-base-content/80">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {books.map((book) => (
                      <tr
                        key={book._id}
                        className="hover:bg-base-200/50 transition-colors border-base-300"
                      >
                        <td className="py-3 flex items-center gap-3">
                          <img
                            src={book.bookImage}
                            alt={`Cover of ${book.title}`}
                            className="w-12 h-16 rounded-md object-cover flex-shrink-0 shadow-sm"
                          />
                          <div className="truncate text-base-content">
                            <div className="font-medium text-base truncate max-w-xs">
                              {book.title}
                            </div>
                            <div className="text-xs text-base-content/60">
                              ID: {book.id || book._id?.slice(-4)}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 align-top whitespace-nowrap text-base-content/90">
                          <div className="text-sm">{book.author}</div>
                        </td>

                        <td className="py-3 align-top whitespace-nowrap">
                          <span className="badge badge-outline badge-info text-xs font-medium">
                            {book.category}
                          </span>
                        </td>

                        <td className="py-3 align-top">
                          <Stars value={book.rating} />
                        </td>

                        {/* Actions buttons using DaisyUI btn classes */}
                        <td className="py-3">
                          <div className="flex gap-2 justify-end items-center">
                            <button
                              onClick={() => handleDelete(book._id)}
                              className="btn btn-error btn-outline btn-xs md:btn-sm"
                              aria-label={`Delete ${book.title}`}
                            >
                              <MdDelete className="text-lg" />
                            </button>

                            <button
                              onClick={() => {
                                handleEdit(book._id);
                              }}
                              className="btn btn-warning btn-outline btn-xs md:btn-sm"
                              aria-label={`Edit ${book.title}`}
                            >
                              <FaRegEdit className="text-lg" />
                            </button>

                            <Link
                              to={`/books-details/${book._id}`}
                              className="btn btn-info btn-outline btn-xs md:btn-sm"
                              aria-label={`View details for ${book.title}`}
                            >
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* MOBILE CARDS - shown on sm and below (Using DaisyUI card and button styles) */}
              <div className="block md:hidden space-y-4">
                {books.map((book) => (
                  <article
                    key={book._id}
                    className="card card-compact bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
                  >
                    <div className="card-body p-4 flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-shrink-0 flex justify-center">
                        <img
                          src={book.bookImage}
                          alt={`Cover of ${book.title}`}
                          className="w-20 h-28 rounded-lg object-cover shadow-md"
                        />
                        <div className="mt-2 absolute right-0">
                          <span className="badge badge-outline badge-info text-xs font-medium">
                            {book.category}
                          </span>
                        </div>
                      </div>

                      {/* Book Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="font-bold text-lg leading-snug text-base-content line-clamp-2">
                            {book.title}
                          </div>
                          <div className="text-sm text-base-content/70 mt-1 font-medium">
                            {book.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Stars value={book.rating} />
                          </div>
                        </div>

                        {/* Rating + Actions */}
                        <div className="mt-3 pt-2 w-full flex items-center justify-between border-t border-base-200 sm:border-t-0 sm:flex-col sm:items-end sm:justify-center sm:w-auto">
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <button
                              onClick={() => handleDelete(book._id)}
                              className="btn btn-error  py-5 btn-outline btn-xs"
                              aria-label={`Delete ${book.title}`}
                            >
                              <MdDelete className="text-lg" />
                            </button>
                            <button
                              onClick={() => handleEdit(book._id)}
                              className="btn btn-warning  py-5 btn-outline btn-xs"
                              aria-label={`Edit ${book.title}`}
                            >
                              <FaRegEdit className="text-lg" />
                            </button>
                            <Link
                              to={`/books-details/${book._id}`}
                              className="btn btn-info py-5 btn-xs"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* EDIT MODAL DIALOG (Updated to use DaisyUI form/input styles) */}
      <dialog ref={editBookRef} className="modal modal-bottom md:modal-middle">
        <div className="modal-box bg-base-100 text-base-content">
          <h3 className="font-bold text-lg mb-4">Edit Book Details</h3>
          <form
            key={edit?._id ?? "empty-edit"}
            onSubmit={handleFormSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="title"
                  defaultValue={edit?.title}
                  required
                />
              </div>

              {/* Author Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">
                    Author
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  name="author"
                  required
                  defaultValue={edit?.author}
                />
              </div>
            </div>

            {/* Author Image URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80">
                  Author Image Url
                </span>
                <span className="label-text-alt text-base-content/50">
                  (optional)
                </span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                name="authorImg"
                defaultValue={edit?.authorImg}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Genre Select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">Genre</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  defaultValue={edit?.category}
                  required
                >
                  <option value="" disabled>
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

              {/* Rating Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">
                    Rating (1-5)
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  defaultValue={edit?.rating}
                  required
                />
              </div>
            </div>

            {/* Summary Textarea */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80">Summary</span>
              </label>
              <textarea
                name="summary"
                required
                rows="3"
                className="textarea textarea-bordered h-32 w-full"
                placeholder="Enter summary"
                defaultValue={edit?.summary}
              ></textarea>
            </div>

            {/* Book Cover Image URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base-content/80">
                  Book Cover Image URL
                </span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                name="bookImage"
                defaultValue={edit?.bookImage}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* User Email (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">
                    User Email
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

              {/* User Name (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content/80">
                    User Name
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

            <button type="submit" className="btn btn-primary w-full mt-6">
              Update Book
            </button>
          </form>

          {/* Modal Close Button */}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBooks;
