import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import BookList from "../pages/BookList";
import BookDetails from "../pages/BookDetails";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import AddBook from "../pages/AddBook";
import UpdateBook from "../pages/UpdateBooks";
import UsersDb from "../pages/UsersDb";
import BooksDb from "../pages/BooksDb ";
import UserTransaction from "../pages/UserTransactions";
import AllTransactions from "../pages/AllTransactions";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";

export default function AppRouter() {
    return (
      <Router>
        <Routes>
          {/* Default route, Home page */}
          <Route path="/" element={<Home />} />

          {/* Authentication routes */}
          
            <Route path="/users/login" element={<LoginPage />} />
            <Route path="/users/forgot-password" element={<ForgotPassword />} />
            <Route path="/users/reset-password" element={<ResetPassword />} />
            <Route path="/users/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/transactions" element={<AllTransactions />} />
          <Route path="/transactions/:id" element={<UserTransaction />} />

          {/* Profile related routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />

          {/* Book-related routes */}
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/edit/:id" element={<UpdateBook />} />
          <Route path="/add-book" element={<AddBook />} />

          {/* Database routes */}
          <Route path="/users" element={<UsersDb />} />
          <Route path="/booksdb" element={<BooksDb />} />

          {/* About Us */}
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Router>
    );
}