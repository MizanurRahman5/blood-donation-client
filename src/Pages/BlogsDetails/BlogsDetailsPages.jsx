// BlogDetailPage.js (Single Blog Page)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetching a specific blog by id from the backend
    fetch(`https://blood-donation-server-site-opal.vercel.app/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container min-h-screen mx-auto p-6">
        <Helmet>
                <meta charSet="utf-8" />
                <title>Blog - BloodDonate</title>
            </Helmet>
        <img src={blog.thumbnail} alt="" />
      <h1 className="text-4xl text-red-600 font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-2">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="mb-6">
        <p className="text-xl">{blog.content}</p>
      </div>
      <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog List</Link>
    </div>
  );
};

export default BlogDetailPage;
