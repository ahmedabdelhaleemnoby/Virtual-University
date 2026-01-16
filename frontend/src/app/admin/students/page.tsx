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

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const fetchStudents = async () => {
    const token = localStorage.getItem('vu_token');
    
    if (!token) {
      setError('You must be logged in to view this page.');
      setIsLoading(false);
      return;
    }
    
    try {
      const res = await fetch('http://localhost:3001/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.status === 401) {
        setError('Your session has expired. Please log in again.');
        setIsLoading(false);
        // Optionally redirect to login after a delay
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
        return;
      }
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Validate that data is an array before filtering
      if (Array.isArray(data)) {
        setStudents(data.filter((u: User) => u.role === 'STUDENT'));
        setError('');
      } else {
        console.error('Expected array but got:', typeof data);
        setStudents([]);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load students. Please try again.');
      setStudents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) return;
    
    const token = localStorage.getItem('vu_token');
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('vu_token');
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          passwordHash: formData.password, // Backend expects passwordHash but hashes it
          role: 'STUDENT'
        }),
      });
      
      if (res.ok) {
        setShowAddModal(false);
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        fetchStudents();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.adminCard}>
      <div className={styles.adminHeader} style={{ borderBottom: 'none', marginBottom: '1rem' }}>
        <h3 className={styles.adminTitle}>Student Management</h3>
        <button 
          onClick={() => setShowAddModal(true)} 
          className={styles.adminButton}
        >
          + Add Student
        </button>
      </div>

      {showAddModal && (
        <div style={{
          background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ margin: '0 0 1rem', color: '#1e293b' }}>Add New Student</h4>
          <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label>First Name</label>
              <input 
                className={styles.input} 
                required 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Last Name</label>
              <input 
                className={styles.input} 
                required 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input 
                className={styles.input} 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input 
                className={styles.input} 
                type="password" 
                required 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className={styles.logoutBtn}
                style={{ border: '1px solid #cbd5e1', color: '#64748b' }}
              >
                Cancel
              </button>
              <button type="submit" className={styles.adminButton}>Create Student</button>
            </div>
          </form>
        </div>
      )}
      
      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#ef4444', 
          padding: '1rem', 
          borderRadius: '0.5rem', 
          marginBottom: '1rem',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}
      
      {isLoading ? (
        <p className={styles.loading}>Loading students...</p>
      ) : (
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                <td>
                  <span style={{ 
                    color: student.isActive ? '#10b981' : '#ef4444',
                    fontWeight: 'bold',
                    fontSize: '0.875rem'
                  }}>
                    {student.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => handleDelete(student.id)}
                    className={styles.logoutBtn}
                    style={{ 
                      padding: '0.25rem 0.75rem', 
                      fontSize: '0.875rem', 
                      color: '#ef4444', 
                      borderColor: '#fecaca',
                      background: '#fee2e2' 
                    }}
                  >
                    Delete
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
