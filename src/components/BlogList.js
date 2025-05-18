import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogList({ onEdit }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs')
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, []);

  const published = blogs.filter(blog => blog.status === 'published');
  const drafts = blogs.filter(blog => blog.status === 'draft');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📜 Published Blogs</h2>
      {published.map(blog => (
        <div key={blog._id} style={{ border: '1px solid green', margin: '10px', padding: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <small>Tags: {blog.tags}</small>
        </div>
      ))}

      <h2>📝 Drafts</h2>
      {drafts.map(blog => (
        <div
          key={blog._id}
          onClick={() => onEdit(blog)}
          style={{ border: '1px solid orange', margin: '10px', padding: '10px', cursor: 'pointer' }}
        >
          <h3>{blog.title || "(Untitled Draft)"}</h3>
          <p>{blog.content}</p>
          <small>Tags: {blog.tags}</small>
        </div>
      ))}
    </div>
  );
}


export default BlogList;
