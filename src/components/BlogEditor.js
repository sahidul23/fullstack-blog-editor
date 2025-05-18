import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function BlogEditor({ selectedBlog, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // Callback to avoid eslint warning
  const handleSaveDraft = useCallback(async (silent = false) => {
    try {
      await axios.post('http://localhost:5000/api/blogs/save-draft', {
        title,
        content,
        tags,
        status: 'draft',
      });

      if (!silent) {
        setStatusMessage('✅ Draft saved!');
        setTimeout(() => setStatusMessage(''), 2000);
      }

      if (onSave) onSave();
    } catch (err) {
      console.error(err);
    }
  }, [title, content, tags, onSave]);

  const handlePublish = async () => {
    try {
      await axios.post('http://localhost:5000/api/blogs/publish', {
        title,
        content,
        tags,
        status: 'published',
      });

      setStatusMessage('✅ Blog published!');
      setTimeout(() => setStatusMessage(''), 2000);

      if (onSave) onSave();
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-save draft after 5s inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (title || content || tags) {
        handleSaveDraft(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [title, content, tags, handleSaveDraft]);

  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title || '');
      setContent(selectedBlog.content || '');
      setTags(selectedBlog.tags || '');
    }
  }, [selectedBlog]);

  return (
    <div className="editor">
      <h2>📝 Blog Editor</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="8"
        placeholder="Write your content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <br />
      <button onClick={() => handleSaveDraft(false)}>💾 Save Draft</button>
      <button onClick={handlePublish}>🚀 Publish</button>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
  
}

export default BlogEditor;
