'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../page.module.css';

interface Enrollment {
  id: string;
  status: string;
  subject: {
    id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    instructor?: {
      firstName: string;
      lastName: string;
    };
    department: {
      name: string;
    };
  };
}

export default function StudentDashboard() {
  const { user, logout, token } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in
    const storedToken = localStorage.getItem('vu_token');
    if (!storedToken) {
      router.push('/auth/login');
      return;
    }

    const fetchEnrollments = async () => {
      try {
        const res = await fetch('http://localhost:3001/enrollments/my', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setEnrollments(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrollments();
  }, [router]);

  if (isLoading) {
    return <div className={styles.loading}>Loading your dashboard...</div>;
  }

  return (
    <div className={styles.dashboardMain}>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>VU</Link>
          <div className={styles.navLinks}>
            <Link href="/courses" className={styles.navLink}>Browse Catalog</Link>
            <div className={styles.welcomeText}>
              Welcome, {user?.firstName}
            </div>
            <button 
              onClick={logout} 
              className={styles.logoutBtn}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className={styles.welcomeBanner}>
        <div className={styles.container}>
          <div className={styles.welcomeContent}>
            <div className={styles.welcomeText}>
              <h1>My Dashboard</h1>
              <p>Track your progress and continue learning</p>
            </div>
            <Link href="/" className={styles.heroSecondaryBtn} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.dashboardGrid}>
          {/* Main Content: Enrolled Courses */}
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Enrolled Courses</h2>
              <Link href="/courses" className={styles.navLink} style={{ fontSize: '0.9rem', color: '#667eea' }}>
                Find New Courses →
              </Link>
            </div>

            {enrollments.length > 0 ? (
              <div className={styles.enrolledGrid}>
                {enrollments.map((enrollment) => (
                  <div key={enrollment.id} className={styles.courseCard}>
                    <div 
                      className={styles.courseImage} 
                      style={{ 
                        backgroundImage: `url(${enrollment.subject.imageUrl || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&q=80'})`,
                        height: '160px'
                      }}
                    >
                      <div className={styles.difficultyBadge}>{enrollment.status}</div>
                    </div>
                    <div className={styles.courseContent}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                        {enrollment.subject.department.name}
                      </span>
                      <h3 style={{ fontSize: '1.25rem', margin: '0.5rem 0' }}>{enrollment.subject.title}</h3>
                      
                      <div className={styles.progressContainer}>
                        <div className={styles.progressText}>
                          <span>Progress</span>
                          <span>0%</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: '0%' }}></div>
                        </div>
                      </div>

                      <div style={{ marginTop: '1.5rem' }}>
                        <Link 
                          href={`/courses/${enrollment.subject.id}/learn`} 
                          className={styles.submitButton}
                          style={{ display: 'block', textAlign: 'center', textDecoration: 'none', margin: 0, padding: '0.75rem' }}
                        >
                          Continue Learning
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyDashboard}>
                <span className={styles.emptyIcon}>📚</span>
                <h3>You haven't enrolled in any courses yet.</h3>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Browse our catalog to start your learning journey.</p>
                <Link href="/courses" className={styles.submitButton} style={{ display: 'inline-block', width: 'auto', padding: '1rem 2rem' }}>
                  Browse Courses
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>📊 Learning Stats</h3>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Target</span>
                <span className={styles.statValue}>30 mins/day</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Completed</span>
                <span className={styles.statValue}>{enrollments.length}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Certificates</span>
                <span className={styles.statValue}>0</span>
              </div>
            </div>

            <div className={styles.sidebarCard}>
              <h3 className={styles.sidebarTitle}>🎯 Goals</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Complete "Advanced Web Development" by the end of the month.
              </p>
            </div>
            
            <Link href="/" className={styles.navLink} style={{ display: 'block', textAlign: 'center', marginTop: '1rem', color: '#94a3b8' }}>
              ← Return to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
