import React, { useMemo } from 'react';
import useAllBooksApi from '../../hooks/useAllBooksApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { FaBook, FaList, FaStar } from 'react-icons/fa';

const Dashboard = () => {
  const { books } = useAllBooksApi();

  // Mock Data for Decoration/Demo purposes
  const mockBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", rating: 4.8, quantity: 15, added: "2024-01-10" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", rating: 4.9, quantity: 12, added: "2024-01-12" },
    { title: "1984", author: "George Orwell", category: "Dystopian", rating: 4.7, quantity: 20, added: "2024-02-01" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Classic", rating: 4.5, quantity: 8, added: "2024-02-15" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", rating: 4.9, quantity: 25, added: "2024-03-05" },
    { title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy", rating: 4.8, quantity: 30, added: "2024-03-10" },
    { title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", rating: 4.6, quantity: 10, added: "2024-03-20" },
    { title: "The Da Vinci Code", author: "Dan Brown", category: "Thriller", rating: 4.4, quantity: 18, added: "2024-04-01" },
    { title: "The Alchemist", author: "Paulo Coelho", category: "Adventure", rating: 4.7, quantity: 22, added: "2024-04-15" },
    { title: "Sapiens", author: "Yuval Noah Harari", category: "History", rating: 4.8, quantity: 14, added: "2024-05-01" },
    { title: "Becoming", author: "Michelle Obama", category: "Biography", rating: 4.9, quantity: 16, added: "2024-05-10" },
    { title: "Dune", author: "Frank Herbert", category: "Sci-Fi", rating: 4.8, quantity: 12, added: "2024-05-20" },
  ];

  // Use query data if available, otherwise fallback to mockBooks
  const displayBooks = books.length > 0 ? books : mockBooks;

  // -- Derived Statistics --
  const stats = useMemo(() => {
    const totalBooks = displayBooks.length;
    const uniqueCategories = new Set(displayBooks.map(b => b.category)).size;
    const averageRating = totalBooks > 0
      ? (displayBooks.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0) / totalBooks).toFixed(1)
      : 0;

    return { totalBooks, uniqueCategories, averageRating };
  }, [displayBooks]);

  // -- Chart Data --
  const categoryData = useMemo(() => {
    const counts = {};
    displayBooks.forEach(book => {
      const cat = book.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [displayBooks]);

  // Trend Data for Line Chart (simulated based on 'added' date or index)
  const trendData = useMemo(() => {
    // Sort by date if available, or just index for mock
    const sorted = [...displayBooks].sort((a, b) => (a.added && b.added) ? new Date(a.added) - new Date(b.added) : 0);

    let cumulative = 0;
    return sorted.map((book, i) => {
      cumulative += 1;
      return {
        name: book.added ? new Date(book.added).toLocaleDateString('en-US', { month: 'short' }) : `Item ${i}`,
        books: cumulative,
        rating: book.rating
      }
    }).filter((_, i) => i % 2 === 0 || i === sorted.length - 1).slice(-10); // Take sample points
  }, [displayBooks]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];


  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaBook className="text-4xl" />
            </div>
            <div className="stat-title">Total Books</div>
            <div className="stat-value text-primary">{stats.totalBooks}</div>
            <div className="stat-desc">Available in library</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <FaList className="text-4xl" />
            </div>
            <div className="stat-title">Categories</div>
            <div className="stat-value text-secondary">{stats.uniqueCategories}</div>
            <div className="stat-desc">Distinct genres</div>
          </div>
        </div>

        <div className="stats shadow bg-base-100 border border-base-200">
          <div className="stat">
            <div className="stat-figure text-accent">
              <FaStar className="text-4xl" />
            </div>
            <div className="stat-title">Avg Rating</div>
            <div className="stat-value text-accent">{stats.averageRating}</div>
            <div className="stat-desc">User reviews</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Books by Category (Bar)</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#8884d8" name="Books Count">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border border-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Category Distribution (Pie)</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Line Chart Section */}
        <div className="card bg-base-100 shadow-xl border border-base-200 lg:col-span-2">
          <div className="card-body">
            <h2 className="card-title mb-4">Inventory Growth Trend</h2>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="books" stroke="#8884d8" name="Total Books" strokeWidth={2} />
                  <Line type="monotone" dataKey="rating" stroke="#82ca9d" name="Rating" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Books Table */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title">Recent Books</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Rating</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {displayBooks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No books found</td>
                  </tr>
                ) : (
                  displayBooks.slice(0, 5).map((book, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={book.bookImage || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt={book.title} />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{book.title}</div>
                          </div>
                        </div>
                      </td>
                      <td>{book.author}</td>
                      <td><span className="badge badge-ghost badge-sm">{book.category}</span></td>
                      <td>{book.rating ? `${book.rating}/5` : 'N/A'}</td>
                      <td>{book.quantity || 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;