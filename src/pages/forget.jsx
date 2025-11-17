import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Forget = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) return toast.error("Please enter your email");

    try {
      setLoading(true);

      const res = await axios.post(
        "https://auth-backend-mern-new.vercel.app/api/user/forgot",
        { email }
      );

      toast.success(res.data.message || "Reset link sent to your email");
      setEmail("");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainsignup">
      <ToastContainer />
      <div className="signup">
        <h1>Reset Password</h1>
        <p>Enter your registered email to receive reset instructions.</p>
        <br></br>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleResetPassword} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>

        <p>
          Remembered your password?
          <Link to="/"><span>Back to Login</span></Link>
        </p>
      </div>
    </div>
  );
};

export default Forget;
