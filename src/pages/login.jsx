import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const inputHandling = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://auth-backend-mern-new.vercel.app/api/user/login", data, {
        withCredentials: true,
      });
        console.log(res.data); 

 
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);
      setData({ email: "", password: "" });

    setTimeout(() => {
  navigate("/home");
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
    <div className="login">
        <div className="main">
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <div>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={inputHandling}
              required
            />
          </div>

          <label>Password:</label>
          <div>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={inputHandling}
              required
            />
          </div>

          <button type="submit">Login</button>
          <p>
            Don’t have an account? <Link to="/register"><span>Signup</span></Link>
            <br></br>
            <br></br>
Forgot your password? <Link to="/forgot"><span>Click here</span></Link>

          </p>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
    </div>
  );
};

export default Login;
