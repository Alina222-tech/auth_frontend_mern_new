import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css"; 

import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Forget from "./pages/forget";
import Reset from "./pages/reset";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />
              <Route path="/forgot" element={<Forget />} />
                     <Route path="/reset/:token" element={<Reset />} />
        <Route path="/home" element={<Home />} />
      </Routes>

     
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;
