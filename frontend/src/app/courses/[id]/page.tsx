'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface Subject {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  difficultyLevel: string;
  imageUrl?: string;
  department: {
    name: string;
    faculty: {
      name: string;
    };
  };
  instructor?: {
    firstName: string;
    lastName: string;
    bio?: string;
  };
  videos: Array<{
    id: string;
    title: string;
    durationSeconds?: number;
  }>;
  materials: Array<{
    id: string;
    title: string;
    fileType?: string;
  }>;
}

export default function CourseDetailPage() {
  const params = useParams();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await fetch(`http://localhost:3001/subjects/${params.id}`);
        const data = await res.json();
        setSubject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchSubject();
    }
  }, [params.id]);

  if (isLoading) {
    return <div className={styles.loading}>Loading course details...</div>;
  }

  if (!subject) {
    return <div className={styles.error}>Course not found</div>;
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Duration N/A';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>VU</Link>
          <div className={styles.navLinks}>
            <Link href="/courses" className={styles.navLink}>All Courses</Link>
            <Link href="/auth/login" className={styles.navButton}>Sign In</Link>
          </div>
        </div>
      </header>

      <section className={styles.courseDetailHero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.container}>
          <div className={styles.courseDetailHeroContent}>
            <div>
              <Link href="/courses" className={styles.backLink} style={{ color: 'white', opacity: 0.8 }}>← Back to Catalog</Link>
              <p style={{ color: '#94a3b8', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
                {subject.department.faculty.name} / {subject.department.name}
              </p>
              <h1 className={styles.courseDetailTitle}>{subject.title}</h1>
              <p className={styles.heroSubtitle} style={{ textAlign: 'left', opacity: 0.9 }}>
                {subject.description}
              </p>
              
              <div className={styles.courseDetailMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Difficulty</span>
                  <span className={styles.metaValue}>{subject.difficultyLevel}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Lessons</span>
                  <span className={styles.metaValue}>{subject.videos.length} Lectures</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Enrollments</span>
                  <span className={styles.metaValue}>500+ Students</span>
                </div>
              </div>
            </div>

            <div className={styles.courseDetailCard}>
              <div className={styles.courseImage} style={{ 
                backgroundImage: `url(${subject.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000'})`,
                height: '220px',
                borderRadius: '1rem',
                marginBottom: '1.5rem'
              }}></div>
              <div className={styles.detailPrice}>${subject.price}</div>
              <button className={styles.submitButton} style={{ margin: 0 }}>Enroll Now</button>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b', textAlign: 'center' }}>
                Full lifetime access • Certificate of completion
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.syllabusSection}>
        <div className={styles.container}>
          <div className={styles.syllabusContainer}>
            <h2 className={styles.syllabusTitle}>Course Curriculum</h2>
            <div className={styles.lessonList}>
              {subject.videos.length > 0 ? subject.videos.map((video, idx) => (
                <div key={video.id} className={styles.lessonItem}>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonIcon}>🎞️</span>
                    <div>
                      <div className={styles.lessonTitle}>{idx + 1}. {video.title}</div>
                      <div className={styles.lessonDuration}>Video Lecture</div>
                    </div>
                  </div>
                  <div className={styles.lessonDuration}>{formatDuration(video.durationSeconds)}</div>
                </div>
              )) : (
                <p>No lectures available yet.</p>
              )}
              
              {subject.materials.map((material) => (
                <div key={material.id} className={styles.lessonItem} style={{ borderLeft: '4px solid #3b82f6' }}>
                  <div className={styles.lessonInfo}>
                    <span className={styles.lessonIcon}>📄</span>
                    <div>
                      <div className={styles.lessonTitle}>{material.title}</div>
                      <div className={styles.lessonDuration}>Reading Material</div>
                    </div>
                  </div>
                  <div className={styles.lessonDuration}>PDF</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.instructorSection}>
        <div className={styles.container}>
          <h2 className={styles.syllabusTitle} style={{ textAlign: 'center' }}>Meet Your Instructor</h2>
          <div className={styles.instructorCard} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className={styles.instructorAvatar}>👤</div>
            <div className={styles.instructorInfo}>
              <h4>{subject.instructor ? `${subject.instructor.firstName} ${subject.instructor.lastName}` : 'Senior Faculty Member'}</h4>
              <p className={styles.instructorBio}>
                {subject.instructor?.bio || "Expert in the field with over 10 years of professional and academic experience. Committed to providing high-quality education and mentoring the next generation of industry leaders."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>© 2026 Virtual University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
