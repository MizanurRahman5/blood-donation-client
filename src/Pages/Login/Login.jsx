import React, { useState, useContext, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { AuthContex } from "../../Provider/AuthProvider";
import Swal from "sweetalert2"; 
import {Helmet} from "react-helmet";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const { signIn, user, loading } = useContext(AuthContex);

  
  useEffect(() => {
    if (user) {
      navigate("/");

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to the platform.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    signIn(email, password)
      .then(() => {
        
        navigate("/");

        
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Welcome back to the platform.",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        setError(err.message.replace("Firebase:", "").trim());
      });
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex flex-col lg:flex-row overflow-hidden">
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login - BloodDonate</title>
            </Helmet>
        {/* Left Side: Animation */}
        <div className="lg:w-1/2 bg-red-50 flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Welcome to Rokto
          </h2>
          <DotLottieReact
            src="https://lottie.host/9566aa76-21d6-4f8b-a903-f1ecf606e0f8/hvNCSil90c.lottie"
            loop
            autoplay
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-gray-600">Remember Me</label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Log In
            </button>
          </form>
          <a
            href="/forgot-password"
            className="text-red-500 text-sm mt-4 hover:underline block"
          >
            Lost your password?
          </a>
          <p className="mt-4 text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-500 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
