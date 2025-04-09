// pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users/profile/${id}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data.user);
        setPosts(data.posts);
      });
  }, [id]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>{profile.email}</h2>
      <img src={profile.profilepic} alt="profile" width="100" />
      <p>{profile.biography}</p>

      <h3>Posts</h3>
      {posts.length === 0 ? <p>No posts yet.</p> : posts.map(p => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
};

export default ProfilePage;
