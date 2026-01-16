'use client';

import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface Faculty {
  id: string;
  name: string;
  slug: string;
}

export default function AdminFacultiesPage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchFaculties = async () => {
    try {
      const res = await fetch('http://localhost:3001/faculties');
      const data = await res.json();
      setFaculties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('vu_token');
    
    try {
      const res = await fetch('http://localhost:3001/faculties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          name, 
          imageUrl,
          slug: name.toLowerCase().replace(/ /g, '-') 
        }),
      });

      if (res.ok) {
        setName('');
        setImageUrl('');
        fetchFaculties();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.adminCard}>
      <h3 className={styles.adminTitle}>Faculty Management</h3>
      
      <form onSubmit={handleCreate} style={{ margin: '2rem 0', display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr auto' }}>
        <input
          className={styles.input}
          placeholder="New Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          placeholder="Image URL (e.g. Unsplash link)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className={styles.adminButton}>Add Faculty</button>
      </form>

      {isLoading ? (
        <p>Loading faculties...</p>
      ) : (
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map((f) => (
              <tr key={f.id}>
                <td>{f.id.substring(0, 8)}...</td>
                <td>{f.name}</td>
                <td>{f.slug}</td>
                <td>
                  <button className={styles.logoutBtn} style={{ color: '#ef4444', borderColor: '#ef4444' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
