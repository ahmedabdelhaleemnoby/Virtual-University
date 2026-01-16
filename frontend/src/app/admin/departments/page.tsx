'use client';

import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface Faculty {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  slug: string;
  facultyId: string;
  faculty?: Faculty;
}

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [name, setName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [depRes, facRes] = await Promise.all([
        fetch('http://localhost:3001/departments'),
        fetch('http://localhost:3001/faculties')
      ]);
      
      const depData = await depRes.json();
      const facData = await facRes.json();
      
      setDepartments(depData);
      setFaculties(facData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('vu_token');
    
    try {
      const res = await fetch('http://localhost:3001/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          name, 
          facultyId,
          slug: name.toLowerCase().replace(/ /g, '-') 
        }),
      });

      if (res.ok) {
        setName('');
        setFacultyId('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.adminCard}>
      <h3 className={styles.adminTitle}>Department Management</h3>
      
      <form onSubmit={handleCreate} style={{ margin: '2rem 0', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem' }}>
        <input
          className={styles.input}
          placeholder="Department Name (e.g. Computer Science)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className={styles.input}
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        >
          <option value="">Select Faculty</option>
          {faculties.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <button type="submit" className={styles.adminButton}>Add Department</button>
      </form>

      {isLoading ? (
        <p>Loading departments...</p>
      ) : (
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Faculty</th>
              <th>Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id}>
                <td>{d.id.substring(0, 8)}...</td>
                <td>{d.name}</td>
                <td>{d.faculty?.name || 'N/A'}</td>
                <td>{d.slug}</td>
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
