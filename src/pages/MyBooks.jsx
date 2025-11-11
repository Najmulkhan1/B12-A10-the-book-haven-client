import React, { useEffect, useState } from "react";
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


useEffect(() => {
  if (!user?.email) return;
  axiosInstance
    .get(`/my-books?email=${encodeURIComponent(user.email)}`)
    .then((res) => {
      setBooks(res.data || []);
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
                  key={book.id}
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

                  <td className="px-4 py-4 text-right">
                    <div className="flex gap-3 justify-end">
                        <button onClick={()=>handleDelete(book._id)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm">
                      <MdDelete />
                    </button>
                    <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 text-sm">
                      <FaRegEdit />
                    </button>
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
