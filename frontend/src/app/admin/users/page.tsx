'use client';

import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('vu_token');
    try {
      const res = await fetch('http://localhost:3001/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const token = localStorage.getItem('vu_token');
    try {
      const res = await fetch(`http://localhost:3001/users/\${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer \${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.adminCard}>
      <h3 className={styles.adminTitle}>User Management</h3>
      
      {isLoading ? (
        <p className={styles.loading}>Loading users...</p>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className={styles.input}
                    style={{ padding: '0.25rem', width: 'auto' }}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <span style={{ 
                    color: user.isActive ? '#10b981' : '#ef4444',
                    fontWeight: 'bold'
                  }}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                   <button className={styles.adminButton} style={{ background: user.isActive ? '#ef4444' : '#10b981' }}>
                    {user.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
