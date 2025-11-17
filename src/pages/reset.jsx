import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Reset = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!password) {
      setErrorMsg("Password is required!");
      toast.error("Password is required!");
      return;
    }

    try {
      const res = await axios.post(
        `https://auth-backend-mern-new.vercel.app/api/user/reset/${token}`,
        { password }
      );

      toast.success(res.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong!";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="mainsignup">
      <ToastContainer />
      <div className="signup">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMsg && <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>}
          <button type="submit">Reset Password</button>
        </form>

        <p>
          Back to <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Reset;
