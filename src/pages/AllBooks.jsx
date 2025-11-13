import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { Search } from "lucide-react";
import { Link } from "react-router";
import Stars from "../components/Stars";
import { ChevronRight } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const AllBooks = () => {
  const {loading} = useAuth()
  const axiosInstance = useAxios();
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("Rating");
  const [isDataLoading, setIsDataLoading] = useState(true)

  // Initial Data Fetch (Functionality preserved)
  useEffect(() => {

    setIsDataLoading(true)

    axiosInstance.get("/books").then((data) => {
      setBooks(data.data);
      setIsDataLoading(false)
    });
  }, [axiosInstance]);

  // Sort Logic (Functionality preserved)
  useEffect(() => {

    setIsDataLoading(true)

    if (sort === "High") {
      axiosInstance.get("/asort-rating").then((res) => {
        setBooks(res.data);
        setIsDataLoading(false)
      });
    } else if (sort === "Low") {
      axiosInstance.get("/dsort-rating").then((res) => {
        setBooks(res.data);
        setIsDataLoading(false)
      });
    } else {
      // Re-fetch default list if sorting is set to "Rating"
      axiosInstance.get("/books").then((res) => {
        setBooks(res.data);
        setIsDataLoading(false)
      });
    }
  }, [axiosInstance, sort]);

  // Search Handler (Functionality preserved)
  const handleSearch = (e) => {
    e.preventDefault();

    setIsDataLoading(true)

    const search_text = e.target.search.value;

    axiosInstance.get(`/search?search=${search_text}`).then((res) => {
      setBooks(res.data);
      setIsDataLoading(false)
    });
  };

  if(isDataLoading){
      return <Loading></Loading>
    }

  return (
    <div className="max-w-7xl mx-auto my-10 min-h-screen">
      <div className="space-y-10">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold md:text-5xl text-base-content">
          📚 All Books
        </h1>

        {/* Controls Section: Total, Search, Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <div className="order-2 sm:order-1 w-full sm:w-auto text-center sm:text-left">
            <h2 className="text-xl font-medium text-base-content/80">
              Total Books: <span className="font-bold text-primary">{books.length}</span>
            </h2>
          </div>

          {/* Search Form (Using DaisyUI input and button styles) */}
          <form onSubmit={handleSearch} className="order-1 sm:order-2 w-full max-w-lg">
            <div className="relative flex w-full">
              {/* 🔍 Search Icon */}
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/60"
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
                className="btn btn-primary rounded-l-none font-medium shadow-md hover:shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Sort Dropdown (Using DaisyUI select styles) */}
          <div className="order-3 w-full sm:w-auto">
            <select
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort by"
              // DaisyUI classes for select
              className="select select-bordered w-full sm:w-40 bg-base-100 text-base-content shadow-md focus:ring-1 focus:ring-primary focus:border-primary"
              defaultValue="Rating"
            >
              <option disabled value="Rating">Sort by Rating</option>
              <option value="High">Highest Rating</option>
              <option value="Low">Lowest Rating</option>
            </select>
          </div>
        </div>

        <hr className="border-t border-base-300" />

        {/* Book List / Table */}
        <div>
          {/* TABLE - shown on sm and above (Using DaisyUI table classes) */}
          <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg bg-base-100 border border-base-300">
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
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-base-content/80">
                    Rating
                  </th>
                  <th className="text-right text-xs font-semibold uppercase tracking-wider text-base-content/80">
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
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={book.bookImage}
                        alt={`Cover of ${book.title}`}
                        className="w-12 h-16 rounded-lg object-cover flex-shrink-0 shadow-md"
                      />
                      <div className="truncate text-base-content">
                        <div className="font-medium truncate max-w-xs text-base">
                          {book.title}
                        </div>
                        <div className="text-xs text-base-content/60 mt-1">
                          ID: {book.id || book._id?.slice(-4)}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 whitespace-nowrap text-base-content/90">
                      <div className="text-sm font-light">
                        {book.author}
                      </div>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <span className="badge badge-outline badge-primary text-xs font-medium">
                        {book.category}
                      </span>
                    </td>

                    <td className="py-4 whitespace-nowrap">
                      <Stars value={book.rating} />
                    </td>

                    <td className="py-4 whitespace-nowrap text-right">
                      <Link
                        to={`/books-details/${book._id}`}
                        className="btn btn-sm btn-primary btn-outline font-medium shadow-md"
                        aria-label={`View details for ${book.title}`}
                      >
                        View Details
                        <ChevronRight size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS - shown on xs (Using DaisyUI card and button styles) */}
          <div className="block sm:hidden space-y-4">
            {books.map((book) => (
              <article
                key={book._id}
                className="card card-compact bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
              >
                <div className="card-body p-4 flex-row gap-4">
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={book.bookImage}
                      alt={`Cover of ${book.title}`}
                      className="w-20 h-28 rounded-lg object-cover shadow-md"
                    />
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
                      <div className="mt-2">
                        <span className="badge badge-outline badge-primary text-xs font-medium">
                          {book.category}
                        </span>
                      </div>
                    </div>

                    {/* Rating + Actions */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-base-200">
                      <div className="flex items-center gap-1">
                        <Stars value={book.rating} />
                      </div>

                      <Link
                        to={`/books-details/${book._id}`}
                        className="btn btn-xs btn-primary font-medium"
                        aria-label={`View details for ${book.title}`}
                      >
                        View
                        <ChevronRight size={14} />
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

export default AllBooks;