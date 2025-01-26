// BlogDetailPage.js (Single Blog Page)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetching a specific blog by id from the backend
    fetch(`http://localhost:3000/blogs/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 text-sm mb-2">By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}</p>
      <div className="mb-6">
        <p className="text-xl">{blog.content}</p>
      </div>
      <Link to="/blog" className="text-blue-600 hover:underline">Back to Blog List</Link>
    </div>
  );
};

export default BlogDetailPage;
