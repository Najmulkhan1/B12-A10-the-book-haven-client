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

    const id = edit?._id

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
    }

    try {
        await axiosInstance.put(`/books/${id}`,newBook)
        // const updated = res.data;

        setBooks(prev =>
  prev.map(b => (b._id === id ? { ...b, ...newBook } : b))
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
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold">All Books</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="search" className="sr-only">
              Search books
            </label>
            <input
              id="search"
              // value={query}
              // onChange={(e) => { setPage(1); setQuery(e.target.value); }}
              placeholder="Search by title, author or genre..."
              className="w-full md:w-80 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <select
              aria-label="Sort by"
              // value={sortBy.key}
              // onChange={(e) => toggleSort(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>
          </div>
        </header>

        <div className="mt-6 overflow-x-auto  rounded-2xl shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Book
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Author
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Genre
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Rating
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className=" divide-y divide-gray-100">
              {books.map((book) => (
                <tr
                  key={book._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 flex items-center gap-4">
                    <img
                      src={book.bookImage}
                      alt={`Cover of ${book.title}`}
                      className="w-12 h-16 rounded-md object-cover flex-shrink-0"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {book.title}
                      </div>
                      <div className="text-sm text-gray-500">ID: {book.id}</div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-800">{book.author}</div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600">{book.category}</div>
                  </td>

                  <td className="px-4 py-4">
                    <Stars value={book.rating} />
                  </td>

                  {/* action buttons */}
                  <td className="px-4 py-4">
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="inline-flex items-center cursor-pointer gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                      >
                        <MdDelete />
                      </button>

                      <button
                        onClick={() => {
                          handleEdit(book._id);
                        }}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                      >
                        <FaRegEdit />
                      </button>

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
                            <div className="grid grid-cols-2 gap-4">
                              {/* title field */}
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

                              {/* author Field */}
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

                            {/* author image */}
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

                            {/* genre category */}
                            <div className="grid grid-cols-2 gap-4">
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

                              {/* rating */}
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

                            {/* summary */}
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

                            {/* cover image */}
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

                            <div className="grid grid-cols-2 gap-4">
                              {/* user Email*/}
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
                              {/* user name */}
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
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      <Link
                        to={`/books-details/${book._id}`}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                        aria-label={`View details for ${book.title}`}
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {/* {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            )} */}
            </tbody>
          </table>
        </div>

        {/* <footer className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="text-sm text-gray-600">Showing {(typeof totalCount === "number") ? `page ${page} of ${totalPages}` : `${Math.min((page-1)*perPage + 1, clientFiltered?.length || 0)} - ${Math.min(page*perPage, clientFiltered?.length || 0)} of ${effectiveTotal}`} </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm">Per page</label>
            <select value={perPage} onChange={(e) => { setPage(1); setPerPage(Number(e.target.value)); }} className="px-2 py-1 border rounded-lg">
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={10}>10</option>
            </select>
          </div>

          <div className="inline-flex items-center gap-1"> 
            <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1 rounded-lg border disabled:opacity-50">First</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded-lg border disabled:opacity-50">Prev</button>

            {getPageButtons().map((p) => (
              <button key={p} onClick={() => setPage(p)} aria-current={p === page} className={`px-3 py-1 rounded-lg border ${p === page ? 'bg-indigo-600 text-white' : ''}`}>
                {p}
              </button>
            ))}

            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded-lg border disabled:opacity-50">Next</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-3 py-1 rounded-lg border disabled:opacity-50">Last</button>
          </div>
        </div>
      </footer> */}
      </div>
    </div>
  );
};

export default MyBooks;
