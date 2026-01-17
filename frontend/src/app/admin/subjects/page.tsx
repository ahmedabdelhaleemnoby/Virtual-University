'use client';

import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface Faculty { id: string; name: string; }
interface Department { id: string; name: string; facultyId: string; }

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    departmentId: '',
    imageUrl: '',
    price: '0.00',
    difficultyLevel: 'BEGINNER',
  });

  const fetchData = async () => {
    const resFac = await fetch('http://localhost:3001/faculties');
    const resDep = await fetch('http://localhost:3001/departments');
    const resSub = await fetch('http://localhost:3001/subjects');
    
    setFaculties(await resFac.json());
    setDepartments(await resDep.json());
    setSubjects(await resSub.json());
    setIsLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('vu_token');
    
    const res = await fetch('http://localhost:3001/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
        slug: formData.title.toLowerCase().replace(/ /g, '-'),
      }),
    });

    if (res.ok) {
      setFormData({ title: '', description: '', departmentId: '', imageUrl: '', price: '0.00', difficultyLevel: 'BEGINNER' });
      fetchData();
    }
  };

  return (
    <div className={styles.adminCard}>
      <h3 className={styles.adminTitle}>Course Management</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
        {/* Create Form */}
        <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '2rem' }}>
          <h4>Add New Course</h4>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Course Title</label>
              <input 
                className={styles.input} 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Description</label>
              <input 
                className={styles.input} 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className={styles.formGroup}>
              <label>Image URL</label>
              <input 
                className={styles.input} 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                placeholder="https://..."
              />
            </div>

            <div className={styles.formGroup}>
              <label>Department</label>
              <select 
                className={styles.input} 
                value={formData.departmentId} 
                onChange={e => setFormData({...formData, departmentId: e.target.value})}
                required
              >
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Price (USD)</label>
              <input 
                type="number" 
                className={styles.input} 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})} 
                required 
              />
            </div>
            <div className={styles.formGroup}>
              <label>Difficulty</label>
              <select 
                className={styles.input} 
                value={formData.difficultyLevel} 
                onChange={e => setFormData({...formData, difficultyLevel: e.target.value})}
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
            </div>
            <button type="submit" className={styles.adminButton} style={{ width: '100%' }}>Create Course</button>
          </form>
        </div>

        {/* List Table */}
        <div>
          <h4>Existing Courses</h4>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(s => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>${s.price}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <a 
                        href={`/admin/subjects/${s.id}/lectures`}
                        className={styles.adminButton} 
                        style={{ background: 'var(--primary-gradient)', textDecoration: 'none', fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                      >
                        Manage Lectures
                      </a>
                      <button className={styles.adminButton} style={{ background: '#10b981', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Edit Details</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
