import React, { useEffect, useRef, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Stars from "../components/Stars";
import { Link } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState(null);
  const editBookRef = useRef();

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance
      .get(`/my-books?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [axiosInstance, user?.email]);

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const id = edit?._id;

    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const authorImg = form.authorImg.value;
    const category = form.category.value;
    const rating = form.rating?.value;
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

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
            All Books
          </h1>

          <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <label htmlFor="search" className="sr-only">
              Search books
            </label>
            <input
              id="search"
              placeholder="Search by title, author or genre..."
              className="w-full sm:w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <select
              aria-label="Sort by"
              className="px-3 py-2 border rounded-lg"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>
          </div>
        </header>

        <div className="mt-4 sm:mt-6">
          {/* TABLE - shown on sm and above */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                    Book
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                    Author
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                    Genre
                  </th>
                  <th className="px-3 py-3 text-left text-sm font-medium text-gray-700">
                    Rating
                  </th>
                  <th className="px-3 py-3 text-right text-sm font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 flex items-center gap-3">
                      <img
                        src={book.bookImage}
                        alt={`Cover of ${book.title}`}
                        className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                      />
                      <div className="truncate">
                        <div className="font-medium text-gray-900 truncate max-w-xs">
                          {book.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {book.id}
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <div className="text-sm text-gray-800">{book.author}</div>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <div className="text-sm text-gray-600">
                        {book.category}
                      </div>
                    </td>

                    <td className="px-3 py-3 align-top">
                      <Stars value={book.rating} />
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex gap-2 justify-end items-center">
                        <button
                          onClick={() => handleDelete(book._id)}
                          className="inline-flex items-center cursor-pointer gap-1 px-2 py-2 sm:px-3 sm:py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                          aria-label={`Delete ${book.title}`}
                        >
                          <MdDelete />
                        </button>

                        <button
                          onClick={() => {
                            handleEdit(book._id);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-2 sm:px-3 sm:py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                          aria-label={`Edit ${book.title}`}
                        >
                          <FaRegEdit />
                        </button>

                        <Link
                          to={`/books-details/${book._id}`}
                          className="inline-flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                          aria-label={`View details for ${book.title}`}
                        >
                          View
                        </Link>

                        {/* dialog remains same and is shared (ref) */}
                        <dialog
                          ref={editBookRef}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <form
                              key={edit?._id ?? "empty-edit"}
                              onSubmit={handleFormSubmit}
                              className="space-y-3"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block">Title</label>
                                  <input
                                    type="text"
                                    className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    name="title"
                                    defaultValue={edit?.title}
                                    required
                                  />
                                </div>

                                <div>
                                  <label className="block">Author</label>
                                  <input
                                    type="text"
                                    className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    name="author"
                                    required
                                    defaultValue={edit?.author}
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block">
                                  Author Image Url{" "}
                                  <span className="text-gray-500">
                                    (optional)
                                  </span>
                                </label>
                                <input
                                  type="url"
                                  className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                  name="authorImg"
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block">Genre</label>
                                  <select
                                    name="category"
                                    className="select w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    defaultValue={edit?.category}
                                    required
                                  >
                                    <option value="1" disabled>
                                      -- Select Genre --
                                    </option>
                                    <option value="Classic Fiction">
                                      Classic Fiction
                                    </option>
                                    <option value="Historical Fiction">
                                      Historical Fiction
                                    </option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Science Fiction">
                                      Science Fiction
                                    </option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Non-Fiction">
                                      Non-Fiction
                                    </option>
                                    <option value="Philosophical Fiction">
                                      Philosophical Fiction
                                    </option>
                                    <option value="Psychological Fiction">
                                      Psychological Fiction
                                    </option>
                                    <option value="Gothic Fiction">
                                      Gothic Fiction
                                    </option>
                                    <option value="Gothic Romance">
                                      Gothic Romance
                                    </option>
                                    <option value="Magical Realism">
                                      Magical Realism
                                    </option>
                                    <option value="Epic Poetry">
                                      Epic Poetry
                                    </option>
                                    <option value="Classic Epic">
                                      Classic Epic
                                    </option>
                                    <option value="Tech Thriller">
                                      Tech Thriller
                                    </option>
                                    <option value="Drama">Drama</option>
                                    <option value="Coming-of-Age Fiction">
                                      Coming-of-Age Fiction
                                    </option>
                                    <option value="Southern Gothic">
                                      Southern Gothic
                                    </option>
                                    <option value="Modernist Fiction">
                                      Modernist Fiction
                                    </option>
                                    <option value="Dystopian Fiction">
                                      Dystopian Fiction
                                    </option>
                                  </select>
                                </div>

                                <div>
                                  <label htmlFor="">Rating</label>
                                  <input
                                    type="number"
                                    className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    defaultValue={edit?.rating}
                                    required
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="label font-medium">
                                  Summary
                                </label>
                                <textarea
                                  name="summary"
                                  required
                                  rows="3"
                                  className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
                                  placeholder="Enter summary"
                                  defaultValue={edit?.summary}
                                ></textarea>
                              </div>

                              <div>
                                <label className="label font-medium">
                                  Book Cover Image
                                </label>
                                <input
                                  type="url"
                                  className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                  name="bookImage"
                                  defaultValue={edit?.bookImage}
                                />
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="label font-medium">
                                    User Email
                                  </label>
                                  <input
                                    type="email;"
                                    className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    name="email"
                                    defaultValue={user?.email}
                                    readOnly
                                  />
                                </div>

                                <div>
                                  <label className="label font-medium">
                                    User Name
                                  </label>
                                  <input
                                    type="text"
                                    className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                                    name="name"
                                    defaultValue={user?.displayName}
                                    readOnly
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="btn w-full bg-amber-700 hover:bg-amber-800 border-none text-white"
                              >
                                Add Book
                              </button>
                            </form>

                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS - shown on xs */}
          <div className="block sm:hidden space-y-3">
            {books.map((book) => (
              <article
                key={book._id}
                className="flex flex-col xs:flex-row gap-3 p-3 rounded-lg border bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Book Image */}
                <div className="flex justify-center xs:justify-start">
                  <img
                    src={book.bookImage}
                    alt={`Cover of ${book.title}`}
                    className="w-24 h-32 xs:w-20 xs:h-28 rounded-md object-cover flex-shrink-0"
                  />
                </div>

                {/* Book Info */}
                <div className="flex-1 min-w-0 mt-2 xs:mt-0">
                  <div className="flex flex-wrap justify-between items-start gap-1">
                    <div className="font-semibold text-base leading-snug text-gray-900 truncate">
                      {book.title}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      ID: {book.id}
                    </div>
                  </div>

                  <div className="text-sm text-gray-700 mt-1 truncate">
                    {book.author}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {book.category}
                  </div>

                  {/* Rating + Actions */}
                  <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mt-3 gap-3">
                    <div className="flex items-center gap-1">
                      <Stars value={book.rating} />
                    </div>

                    <div className="flex items-center gap-2 w-full xs:w-auto justify-between xs:justify-end">
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="flex items-center justify-center p-2 rounded-md border bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm w-1/3 xs:w-auto"
                        aria-label={`Delete ${book.title}`}
                      >
                        <MdDelete className="text-lg" />
                      </button>

                      <button
                        onClick={() => handleEdit(book._id)}
                        className="flex items-center justify-center p-2 rounded-md border bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm w-1/3 xs:w-auto"
                        aria-label={`Edit ${book.title}`}
                      >
                        <FaRegEdit className="text-lg" />
                      </button>

                      <Link
                        to={`/books-details/${book._id}`}
                        className="flex items-center justify-center px-3 py-2 rounded-md border bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm w-1/3 xs:w-auto text-center"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooks;
