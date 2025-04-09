import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/searchBar';
import PostCard from '../components/PostCard';

const HomePage = () => {
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // ✅ added
  const navigate = useNavigate(); // ✅ added

  // Fetch posts
  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, [reload]);

  // Check if user is logged in
  useEffect(() => {
    fetch('http://localhost:5000/users/me', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        setCurrentUser(data.user);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  // Post form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch('http://localhost:5000/posts', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      setContent('');
      setReload(!reload);
    } else {
      alert('Failed to post');
    }
  };

  return (
    <div className="container">
      <h2>Welcome {currentUser?.email || 'User'} 👋</h2>

      <SearchBar />

      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <button type="submit">Post</button>
      </form>

      <h3>All Posts</h3>
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default HomePage;
