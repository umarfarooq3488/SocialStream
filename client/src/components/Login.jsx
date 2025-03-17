import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { loginUser } from "../api/Api";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useUser();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const userData = await loginUser(formData);
      dispatch({ type: "LOGIN_SUCCESS", payload: userData });
      toast.success(`Success! Welcome ${userData.data.fullName}`);
      setTimeout(() => {
        navigate("/home", { replace: true });
      }, 2000);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILED", payload: error });
      toast.error(`Error! ${error.message}`);
    }
    // console.log(formData);
  };

  // Required field indicator component
  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <Toaster />
      <div className="bg-white rounded-xl shadow-md w-full max-w-md border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Social Stream</h1>
          <p className="text-gray-500 mt-2">Welcome back! Please sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="username"
            >
              Username
              <RequiredMark />
            </label>
            <div className="relative">
              <div className="absolute left-3 inset-y-0 flex items-center text-gray-400">
                <User size={18} />
              </div>
              <input
                type="text"
                name="userName"
                id="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="email"
            >
              Email
              <RequiredMark />
            </label>
            <div className="relative">
              <div className="absolute left-3 inset-y-0 flex items-center text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                className="block text-gray-700 text-sm font-medium"
                htmlFor="password"
              >
                Password
                <RequiredMark />
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute left-3 inset-y-0 flex items-center text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="mt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
            >
              Sign In
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
