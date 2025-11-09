import React from "react";

const ElegantNewsletter = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("submit done");
        
    }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <label htmlFor="elegant-email" className="sr-only">
          Email address
        </label>
        <input
          id="elegant-email"
          name="email"
          type="email"
          placeholder="you@reader.com"
          required
          className="flex-1 rounded-md border border-amber-200 bg-white px-3 py-2 text-sm text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
        <button
          type="submit"
          className="rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default ElegantNewsletter;
