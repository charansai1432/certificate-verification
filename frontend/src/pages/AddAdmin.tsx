import React, { useState } from 'react';

const AddAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setMessage('New admin added successfully!');
      setEmail('');
      setPassword('');
    } else {
      setMessage('Failed to add admin');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Admin</h2>
      {message && <p className="mb-4 text-sm text-blue-600">{message}</p>}
      <form onSubmit={handleAddAdmin} className="space-y-4">
        <div>
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;
