import React, { useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  return (
    <div className="container">
      <h2>Testing</h2>
      <button onClick={fetchUsers}>Get all users</button>

      {users.map((user, i) => (
        <div className="container" key={i}>
          <img src={user.profilepic} width="100" alt="Profile" />
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
