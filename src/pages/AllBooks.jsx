import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router";

import Loading from "../components/Loading";
import Stars from "../components/Stars";

const AllBooks = () => {
  const axiosInstance = useAxios();

  // Data
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [totalCount, setTotalCount] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);

  // Filter
  const [sort, setSort] = useState("");
  const [searchText, setSearchText] = useState("");

  const numberOfPages = Math.ceil(totalCount / booksPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // FETCH BOOKS
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // setLoading(true);
        const res = await axiosInstance.get(
          `/books?page=${currentPage}&size=${booksPerPage}&sort=${sort}&search=${searchText}`
        );

        console.log(res);

        setBooks(res.data.books || []);
setTotalCount(res.data.count || 0);
      } catch (error) {
        console.error("Failed to load books", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, booksPerPage, sort, searchText]);

  // SEARCH
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    setSearchText(e.target.search.value);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl p-4 mx-auto my-10 min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-10">📚 All Books</h1>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <h2 className="text-xl">
          Total Books: <span className="font-bold text-amber-600">{totalCount}</span>
        </h2>

        {/* SEARCH */}
        <form onSubmit={handleSearch} className="flex w-full md:w-96">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} />
            <input
              name="search"
              type="search"
              placeholder="Search by title..."
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
              className="input input-bordered w-full pl-10 rounded-r-none"
            />
          </div>
          <button className="btn bg-amber-600 text-white rounded-l-none">
            Search
          </button>
        </form>

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(0);
          }}
          className="select select-bordered w-48"
        >
          <option value="">Default Rating</option>
          <option value="rating_desc">Highest Rating</option>
          <option value="rating_asc">Lowest Rating</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg shadow bg-base-100">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Rating</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">
                  No books found 📭
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book._id}>
                  <td className="flex gap-3 items-center">
                    <img
                      src={book.bookImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <span>{book.title}</span>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className="badge badge-outline badge-primary">
                      {book.category}
                    </span>
                  </td>
                  <td>
                    <Stars value={book.rating} />
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/books-details/${book._id}`}
                      className="btn btn-sm border border-amber-600 text-amber-600"
                    >
                      View <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col items-center mt-8 gap-4">
        <div className="join">
          <button
            className="join-item btn btn-sm"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={16} />
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`join-item btn btn-sm ${
                currentPage === page ? "bg-amber-600 text-white" : ""
              }`}
            >
              {page + 1}
            </button>
          ))}

          <button
            className="join-item btn btn-sm"
            disabled={currentPage === numberOfPages - 1}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <select
          value={booksPerPage}
          onChange={(e) => {
            setBooksPerPage(parseInt(e.target.value));
            setCurrentPage(0);
          }}
          className="select select-sm select-bordered"
        >
          <option value="6">6 per page</option>
          <option value="12">12 per page</option>
          <option value="24">24 per page</option>
        </select>
      </div>
    </div>
  );
};

export default AllBooks;
