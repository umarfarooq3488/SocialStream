import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Camera, Upload } from "lucide-react";
import { useUser } from "../context/UserContext";
import { registerUser } from "../api/Api";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    fullName: "",
    avatar: "",
    coverImage: "",
  });

  const { state, dispatch } = useUser();
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const result = e.target.result;

        if (fileType === "avatar") {
          setAvatarPreview(result);
          setFormData((prev) => ({ ...prev, avatar: file }));
        } else if (fileType === "coverImage") {
          setCoverPreview(result);
          setFormData((prev) => ({ ...prev, coverImage: file }));
        }
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_REQUEST" });

    const formDataToSend = new FormData();
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage);

    try {
      const userData = await registerUser(formDataToSend);
      dispatch({ type: "REGISTER_SUCCESS", payload: userData });
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", payload: error });
      toast.error(`Error: ${error.message}`);
    }
  };

  const RequiredMark = () => <span className="text-red-500 ml-1">*</span>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <Toaster />
      <div className="bg-white rounded-xl shadow-md w-full max-w-5xl border border-gray-100">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Images */}
          <div className="w-full md:w-2/5 p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Social Stream
              </h1>
              <p className="text-gray-500 mt-1">Create your channel</p>
            </div>

            {/* Cover Image Preview */}
            <div className="mb-6 relative rounded-lg bg-gray-100 h-40 overflow-hidden flex items-center justify-center">
              {coverPreview ? (
                <div className="w-full h-full relative">
                  <img
                    src={coverPreview}
                    alt="Cover Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 truncate">
                    {formData.coverImage.name}
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 flex flex-col items-center">
                  <Upload size={28} className="mb-1" />
                  <span className="text-sm">
                    Add Cover Image <RequiredMark />
                  </span>
                </div>
              )}
              <input
                type="file"
                name="coverImage"
                id="coverImage"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(e, "coverImage")}
              />
            </div>

            {/* Avatar Upload */}
            <div className="flex justify-center mb-8 relative">
              <div className="w-24 h-24 rounded-full bg-white shadow-md p-1">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera size={24} className="text-gray-400" />
                  )}
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "avatar")}
                  />
                  <RequiredMark />
                </div>
              </div>
              {formData.avatar && (
                <div className="absolute -bottom-6 bg-white px-2 py-1 rounded text-xs border text-gray-600 shadow-sm">
                  {formData.avatar.name}
                </div>
              )}
            </div>
          </div>

          {/* Right side - Form Fields */}
          <div className="w-full md:w-3/5 p-8 border-t md:border-t-0 md:border-l border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="fullName"
                  >
                    Full Name
                    <RequiredMark />
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-medium mb-2"
                    htmlFor="userName"
                  >
                    Username
                    <RequiredMark />
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 inset-y-0 flex items-center text-gray-400">
                      @
                    </span>
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                      placeholder="Choose a username"
                      required
                    />
                  </div>
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
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                  <RequiredMark />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder="Create a secure password"
                  required
                />
              </div>

              <div className="flex items-center pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
                >
                  Create Channel
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm pt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
