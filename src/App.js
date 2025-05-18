import React, { useState } from 'react';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import './App.css';

function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // force re-fetch

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  const handleSave = () => {
    setSelectedBlog(null); // reset form after saving
    setRefreshKey(prev => prev + 1); // refresh blog list
  };

  return (
    <div className="App">
      <BlogEditor selectedBlog={selectedBlog} onSave={handleSave} />
      <hr />
      <BlogList key={refreshKey} onEdit={handleEdit} />
    </div>
  );
}

export default App;

