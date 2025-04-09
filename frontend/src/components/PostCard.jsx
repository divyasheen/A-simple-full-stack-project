// components/PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img src={post.author?.profilepic} alt="profile" width="30" />
        <strong>{post.author?.email}</strong>
      </div>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default PostCard;
