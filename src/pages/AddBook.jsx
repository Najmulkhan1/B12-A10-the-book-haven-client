import React from "react";
import BackButton from "../components/BackButton";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const AddBook = () => {

    const {user} = useAuth()

  return (
    <div className="w-11/12 mx-auto min-h-120">
      <div className="flex justify-center mt-4">
        <div className="bg-[#fffbeb]/30 rounded shadow-2xl w-124 min-h-120 p-4">
          <div className="flex items-center justify-between px-4 py-2 relative">
            {/* Left side */}
            <div className="flex items-center gap-2 absolute left-4">
              <Link to="/">
                <BackButton />
              </Link>
            </div>

            {/* Center title */}
            <div className="flex-grow text-center">
              <h2 className="text-xl md:text-2xl font-bold">Book Add</h2>
            </div>
          </div>

          <form className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              {/* title field */}
              <div>
                <label className="block">Title</label>
                <input
                  type="text"
                  className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                  name="title"
                />
              </div>

              {/* author Field */}
              <div>
                <label className="block">Author</label>
                <input
                  type="text"
                  className="input w-full rounded-lg focus:border-0 focus:outline-gray-200"
                  name="author"
                />
              </div>
            </div>

            {/* author image */}
            <div>
              <label className="block">
                Author Image Url{" "}
                <span className="text-gray-500">(optional)</span>
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
                  required
                >
                  <option value="" selected disabled>
                Select Genre
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

              {/* rating */}
              <div >
                <label htmlFor="">Rating</label>
              <input type="number" className="input w-full rounded-lg focus:border-0 focus:outline-gray-200" name="" id="" />
              </div>
            </div>

            {/* summary */}
            <div>
            <label className="label font-medium">Summary</label>
            <textarea
              name="description"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
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
                name="authorImg"
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

          <button type="submit" className="btn w-full bg-amber-700 hover:bg-amber-800 border-none text-white">Add Book</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
