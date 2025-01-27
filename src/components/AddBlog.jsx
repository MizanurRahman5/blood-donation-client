import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newBlog = {
      title,
      thumbnail,  // তুমি চাইলে এটিকে tags এর মধ্যে রাখতে পারো
      content,
      author: "Your Name Here",  // নতুন ফিল্ড
      tags: [],  // tags ফিল্ডও সার্ভারে পাঠানো হচ্ছে
      status: "draft"
    };
  
    try {
      const response = await fetch("https://blood-donation-server-site-opal.vercel.app/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      if (data.success) {
        alert("Blog created successfully!");
        setTitle("");
        setThumbnail("");
        setContent("");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog.");
    }
    setLoading(false);
  };
  


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
      {/* Form */}
      <div className="mt-4 p-4 border rounded shadow">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Blog Title"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Thumbnail URL"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Blog Content"
            className="w-full p-2 mb-2 border rounded"
            rows="5"
            required
          ></textarea>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
