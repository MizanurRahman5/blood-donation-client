import React, { useState } from "react";
import { JoditEditor } from "jodit-react";  // Import jodit-react for rich text editor

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newBlog = { title, thumbnail, content, status: 'draft' };

    try {
      const response = await fetch('http://localhost:3000//dashboard/content-management/add-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      if (data.success) {
        alert('Blog created successfully!');
        // Redirect back to Content Management page or reset the form
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Thumbnail URL"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        {/* <JoditEditor value={content} onChange={setContent} /> */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
