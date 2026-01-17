'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../../../page.module.css';

interface Lecture {
  id: string;
  title: string;
  description: string;
  providerVideoId: string;
  displayOrder: number;
}

export default function LecturesPage({ params }: { params: Promise<{ id: string }> }) {
  const [subjectId, setSubjectId] = useState<string>('');
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '', // Admin pastes URL here
    providerVideoId: '', // Extracted or direct ID
    displayOrder: 1,
  });

  useEffect(() => {
    // Unwrap params
    params.then(unwrappedParams => {
      setSubjectId(unwrappedParams.id);
      fetchLectures(unwrappedParams.id);
    });
  }, [params]);

  const fetchLectures = async (subId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/lectures?subjectId=${subId}`);
      if (res.ok) {
        setLectures(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch lectures', error);
    } finally {
      setIsLoading(false);
    }
  };

  const extractVideoId = (url: string) => {
    // Basic Google Drive ID extraction
    // Supports: https://drive.google.com/file/d/VIDEO_ID/view...
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : url; // Return extracted ID or the input itself
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('vu_token');
    
    // Extract ID if URL is pasted
    const videoId = extractVideoId(formData.videoUrl);

    try {
      const res = await fetch('http://localhost:3001/lectures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          subjectId,
          title: formData.title,
          description: formData.description,
          providerVideoId: videoId,
          displayOrder: parseInt(formData.displayOrder.toString()),
          provider: 'GOOGLE_DRIVE'
        }),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ title: '', description: '', videoUrl: '', providerVideoId: '', displayOrder: lectures.length + 1 });
        fetchLectures(subjectId);
      }
    } catch (error) {
      console.error('Create failed', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Area you sure you want to delete this lecture?')) return;
    
    const token = localStorage.getItem('vu_token');
    await fetch(`http://localhost:3001/lectures/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchLectures(subjectId);
  }

  if (isLoading) return <div className={styles.loading}>Loading lectures...</div>;

  return (
    <div className={styles.adminCard}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
           <Link href="/admin/subjects" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>← Back to Courses</Link>
           <h3 className={styles.adminTitle} style={{ marginTop: '0.5rem' }}>Manage Lectures</h3>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={styles.adminButton}>
          {showForm ? 'Cancel' : '+ Add Lecture'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showForm ? '1fr 1fr' : '1fr', gap: '2rem' }}>
        
        {/* Lecture Form */}
        {showForm && (
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '1rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>New Lecture</h4>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input className={styles.input} value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea className={styles.input} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Google Drive URL / ID</label>
                        <input 
                            className={styles.input} 
                            value={formData.videoUrl} 
                            onChange={e => setFormData({...formData, videoUrl: e.target.value})} 
                            placeholder="https://drive.google.com/file/d/..."
                            required 
                        />
                        <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>Paste the full sharing link or just the Video ID.</small>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Order</label>
                        <input type="number" className={styles.input} value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
                    </div>
                    <button type="submit" className={styles.adminButton} style={{ width: '100%' }}>Save Lecture</button>
                </form>
            </div>
        )}

        {/* Lectures List */}
        <div>
            {lectures.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                    No lectures added yet.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {lectures.map((lecture) => (
                        <div key={lecture.id} style={{ 
                            background: 'var(--bg-primary)', 
                            border: '1px solid var(--border-color)', 
                            padding: '1rem', 
                            borderRadius: '0.5rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>
                                    #{lecture.displayOrder} {lecture.title}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    ID: {lecture.providerVideoId}
                                </div>
                            </div>
                            <button 
                                onClick={() => handleDelete(lecture.id)}
                                style={{ 
                                    background: '#ef4444', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '0.5rem', 
                                    borderRadius: '0.25rem',
                                    cursor: 'pointer' 
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
