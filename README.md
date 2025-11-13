# The Book Haven — React + Vite Frontend

## 📖 Project Description

**The Book Haven** is a modern and user-friendly digital library web application built with **React + Vite**. The platform allows users to explore books, view detailed information, and manage their own collection through a clean and responsive interface.

Users can securely log in using Firebase Authentication and gain access to features like adding new books, updating existing entries, and viewing a personalized list of books they’ve added. The goal of this project is to offer a smooth, intuitive experience with fast loading, private routes, and a visually appealing design — optimized for mobile, tablet, and desktop.

This document describes the frontend for **The Book Haven** built with **React** and **Vite**. It provides a clear, code-free overview of app structure, behavior, and important implementation notes for a Vite-powered React client.

---

## 🚀 Summary

A responsive React app (bootstrapped with Vite) that lets users browse books, view details, and—when authenticated—add, update, and delete their own books. Authentication is handled via Firebase (Email/Password and Google). The frontend communicates with a backend API for book CRUD operations.

---

## 🧩 Key Features

* Firebase Authentication (Email/Password + Google)
* Browse all books and view book details
* Add, update, delete books (protected — authenticated users only)
* "My Books" page showing only the current user's books
* Latest 6 books displayed on the homepage
* Route protection for private pages
* Custom toasts/notifications and loading spinners
* Responsive design for mobile, tablet, and desktop

---

* Live Link : https://roaring-ganache-3c8c0f.netlify.app/

## 🔧 Implementation Notes

* **Routing:** Use React Router v6 to define public and protected routes. Implement a `PrivateRoute` or route wrapper that checks authentication from `AuthContext` and redirects unauthenticated users to the Login page.

* **Auth:** Use Firebase Authentication for sign-up, sign-in, and Google OAuth. Store user info in an `AuthContext` and expose the current user and helper methods (login, logout, getIdToken).

* **API integration:** Create a central Axios instance that attaches the Firebase ID token to requests (`Authorization: Bearer <token>`) via an Axios request interceptor. Show a loading spinner while data is being fetched.

* **Forms & validation:** Use controlled components or a form library; validate inputs on the client side:

  * Password: minimum 6 characters, at least one uppercase and one lowercase
  * Rating: between 1 and 5
  * Required book fields: title, author, genre, rating, summary, coverImage

* **Notifications:** Implement custom toast notifications for success and error messages — do not use built-in `alert()` dialogs.

* **Commit requirement:** Maintain at least 15 meaningful Git commits on the client repository.

---

## 📄 Pages & Behavior

* **Home:** Banner plus dynamic display of the latest 6 books fetched from the API and two static sections (e.g., Top Genres).

* **All Books:** Table or grid listing all books with a "View Details" action. Optionally include sorting by rating.

* **Book Details:** Full details for a book. If logged in, users can add comments (optional) or see actions to update/delete if they are the owner.

* **Add Book:** Authenticated users can submit a form to add a new book.

* **My Books:** Lists books created by the logged-in user with Update and Delete controls.

* **Update Book:** Pre-filled form or modal that allows owners to edit book fields.

* **Login / Register:** Separate pages with password validation rules and a Google sign-in option.

* **Not Found:** Custom 404 page for invalid routes.

---

## 🎨 UI/UX Guidelines

* **Navbar:** Links to Home, All Books, Add Book, My Books, and Login/Register. When logged in, show the user's avatar and a Log Out button; display the user's name on hover.

* **Accessibility:** Ensure proper contrast, keyboard navigation, and semantic HTML.

* **No Lorem Ipsum:** Avoid placeholder lorem text anywhere in the UI.

---

## 📦 Build & Hosting (Client-only)

* Use Vite to build the production bundle.
* Recommended hosting: Netlify, Surge, or Firebase Hosting.
* Ensure the client has at least **15 meaningful Git commits**.

---

## ✅ Optional Enhancements

* Sort All Books by rating (frontend control + backend query support)
* Dark/Light theme toggle persisted in `localStorage`
* Real-time comments using Firebase Firestore or Socket.IO

---

## Links
* Client-side GitHub repository link: https://github.com/Najmulkhan1/B12-A10-the-book-haven-client
* Server-side GitHub repository link: https://github.com/Najmulkhan1/B12-A10-the-book-haven-server
* Live website link: https://roaring-ganache-3c8c0f.netlify.app/


## ✅ Final Notes

This README focuses on the React + Vite frontend for The Book Haven. It intentionally omits server and environment configuration details. If you want sample component templates, an Axios instance example, or a ready-made `AuthContext` implementation, tell me which piece you'd like and I will add a descriptive guide or code sample.
