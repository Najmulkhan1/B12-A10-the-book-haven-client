import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Search } from "lucide-react";
import { Link } from "react-router";
import Stars from "../components/Stars";

const AllBooks = () => {
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([])

  useEffect(() => {
    axiosInstance.get("/books").then((data) => {
      console.log(data.data);
      setBooks(data.data)
    });
  }, [axiosInstance]);

  return (
    <div className="w-11/12 mx-auto my-10">
      <div>
        <h1 className="text-center text-3xl font-semibold md:text-5xl">
          All Books
        </h1>
        <div className="flex justify-between mt-10">
          <div></div>

          {/* search */}
          <div className="relative flex w-full max-w-md">
            {/* 🔍 Search Icon */}
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300"
              size={18}
            />

            {/* 🔎 Input Field */}
            <input
              type="search"
              placeholder="Search..."
              className="custom-search w-full bg-amber-100 dark:bg-slate-700 pl-10 pr-4 py-2 rounded-l-lg border border-amber-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400 text-black dark:text-slate-100 shadow-sm hover:shadow-md"
            />

            {/* 🔘 Search Button */}
            <button className="bg-amber-500 dark:bg-amber-400 text-white dark:text-black px-4 rounded-r-lg font-medium hover:bg-amber-600 dark:hover:bg-amber-300 transition-colors duration-200">
              Search
            </button>
          </div>

          {/* sort */}
          <select aria-label="Sort by" className="px-3 py-2 border rounded-lg">
            <option value="title">Rating</option>
            <option value="author">Hight to Low </option>
            <option value="genre">Low to High</option>
          </select>
        </div>

        <div className="mt-10">

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
                        {/* <button
                          // onClick={() => handleDelete(book._id)}
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
                        </button> */}

                        <Link
                          to={`/books-details/${book._id}`}
                          className="inline-flex items-center gap-1 sm:gap-2 px-2 py-2 sm:px-3 sm:py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                          aria-label={`View details for ${book.title}`}
                        >
                          View
                        </Link>

                        {/* dialog remains same and is shared (ref) */}
                        {/* <dialog
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
                        </dialog> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AllBooks;
