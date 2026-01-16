'use client';

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from 'react';
import styles from "../page.module.css";

interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  difficultyLevel: string;
  imageUrl?: string;
}

interface Faculty {
  id: string;
  name: string;
}

export default function CoursesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, facRes] = await Promise.all([
          fetch('http://localhost:3001/subjects'),
          fetch('http://localhost:3001/faculties')
        ]);

        if (!subRes.ok || !facRes.ok) throw new Error('Failed to fetch data');

        const subjectsData = await subRes.json();
        const facultiesData = await facRes.json();

        setSubjects(subjectsData);
        setFaculties(facultiesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>🎓 Virtual University</Link>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/courses" className={styles.navLink} style={{ color: 'var(--primary-color)' }}>Courses</Link>
            {user && user.role === 'STUDENT' && (
              <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
            )}
            <LanguageSwitcher />
            <ThemeSwitcher />
            {user ? (
              <>
                <span className={styles.welcomeText}>Welcome, {user.firstName}!</span>
                {user.role === 'ADMIN' && (
                  <Link href="/admin" className={styles.navLink}>Admin Panel</Link>
                )}
                <button onClick={logout} className={styles.logoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className={styles.navLink}>Login</Link>
                <Link href="/auth/register" className={styles.navButton}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: '3rem 0', 
        borderBottom: '1px solid var(--border-color)' 
      }}>
        <div className={styles.container}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '0.5rem',
            color: 'var(--text-primary)'
          }}>
            Course Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Discover our wide range of academic programs
          </p>
        </div>
      </div>

      <main style={{ padding: '3rem 0' }}>
        <div className={styles.container}>
          {isLoading && <div className={styles.loading}>Loading courses...</div>}
          {error && <div className={styles.error}>{error}</div>}
          
          {!isLoading && !error && (
            <div className={styles.courseGrid}>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <div key={subject.id} className={styles.courseCard}>
                    <div 
                      className={styles.courseImage} 
                      style={{ 
                        backgroundImage: `url(${subject.imageUrl || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80'})` 
                      }}
                    >
                      <div className={styles.difficultyBadge}>{subject.difficultyLevel}</div>
                    </div>
                    <div className={styles.courseContent}>
                      <h3 style={{ color: 'var(--text-primary)' }}>{subject.title}</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        {subject.description?.substring(0, 100)}...
                      </p>
                      <div className={styles.courseFooter}>
                        <span className={styles.price}>${Number(subject.price).toFixed(2)}</span>
                        <Link href={`/courses/${subject.slug}`} className={styles.enrollBtn}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '3rem', 
                  color: 'var(--text-secondary)' 
                }}>
                  No courses found. Start by adding courses in the admin panel!
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Virtual University. Empowering minds globally.</p>
      </footer>
    </div>
  );
}
