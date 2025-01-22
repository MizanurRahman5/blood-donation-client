import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContentManagementPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('draft');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/dashboard/content-management?filter=${filter}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, [filter]);

  const handlePublish = async (id) => {
    await fetch(`/dashboard/content-management/publish/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'publish' }),
      headers: { 'Content-Type': 'application/json' },
    });
    // Reload the blogs after update
    setFilter(filter);
  };

  const handleUnpublish = async (id) => {
    await fetch(`/dashboard/content-management/publish/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ action: 'unpublish' }),
      headers: { 'Content-Type': 'application/json' },
    });
    // Reload the blogs after update
    setFilter(filter);
  };

  const handleDelete = async (id) => {
    await fetch(`/dashboard/content-management/delete/${id}`, {
      method: 'DELETE',
    });
    // Reload the blogs after deletion
    setFilter(filter);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      <div className="flex justify-between mb-4">
      <Link to='/admin-dashboard/add-blog'>
  <button className="bg-green-500 text-white px-4 py-2 rounded">Add Blog</button>
</Link>


        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-medium">{blog.title}</h2>
            <img src={blog.thumbnail} alt={blog.title} className="w-full h-40 object-cover rounded my-2" />
            <p className="text-sm">{blog.content.slice(0, 100)}...</p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => blog.status === 'draft' ? handlePublish(blog._id) : handleUnpublish(blog._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagementPage;
