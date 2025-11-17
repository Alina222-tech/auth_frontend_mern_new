import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    First_Name: "",
    Last_Name: "",
    email: "",
    password: "",
    profile_image: null,
    role: "User",
  });

  const inputHandling = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setData((prev) => ({ ...prev, profile_image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.profile_image) {
      toast.error("Please upload a profile image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("First_Name", data.First_Name);
      formData.append("Last_Name", data.Last_Name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profile_image", data.profile_image);
      formData.append("role", data.role);

      
      const res = await axios.post(
        "https://auth-backend-mern-new.vercel.app/api/user/register",
        formData,
        {

          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Signup successful!");

      setData({
        First_Name: "",
        Last_Name: "",
        email: "",
        password: "",
        profile_image: null,
        role: "User",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Unable to connect. Please try again later.");
      }
    }
  };

  return (
    <div className="mainsignup">
      <div className="signup">
        <h1>Signup</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>First Name:</label>
          <input
            type="text"
            name="First_Name"
            value={data.First_Name}
            onChange={inputHandling}
            required
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="Last_Name"
            value={data.Last_Name}
            onChange={inputHandling}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={inputHandling}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={inputHandling}
            required
          />

          <label>Profile Image:</label>
          <input
            type="file"
            name="profile_image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <label>Role:</label>
          <select
            name="role"
            value={data.role}
            onChange={inputHandling}
            required
            style={{ width: "100%" }}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <br />
          <br />

          <button type="submit">Signup</button>

          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;
