import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    try {
      await axios.post("https://auth-backend-mern-new.vercel.app/api/user/logout", {}, { withCredentials: true });

       localStorage.removeItem("token")
       localStorage.removeItem("user")

      toast.success("You have been logged out.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
   
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Website</h1>

      {user ? (
        <div className="user-card">
          {user.profile_image && (
            <img
              src={user.profile_image}
              alt={`${user.First_Name}'s profile`}
              className="profile-img"
            />
          )}

          <h2><span>Hello, </span>{user.First_Name} {user.Last_Name}</h2>
          <p><span>Email: </span>{user.email}</p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p className="no-user">
          No user found. Please <Link to="/" className="login-link">Login</Link>
        </p>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Home;
