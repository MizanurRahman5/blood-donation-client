// BlogPage.js (Main Page displaying all blogs)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetching published blogs from the backend (e.g., MongoDB)
    fetch("https://blood-donation-server-site-opal.vercel.app/blogs")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false); // Data loaded successfully
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false); // Stop loading even on error
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blogs - BloodDonate</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-6">Published Blogs</h1>

      {loading ? (
        // Show spinner while loading
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        // Show blogs once loaded
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden"
            >
              <img
                src={blog.thumbnail || "https://via.placeholder.com/300"}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">
                  {blog.content.length > 100
                    ? `${blog.content.slice(0, 100)}...`
                    : blog.content}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-red-500 hover:underline mt-4 block"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
