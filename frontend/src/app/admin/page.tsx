'use client';

import styles from '../page.module.css';

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          Welcome to the Admin Dashboard
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Manage your university's content, users, and academic structure from here.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className={styles.adminCard}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📚</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Courses
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Manage all courses, subjects, and curriculum
          </p>
          <a href="/admin/subjects" className={styles.navLink} style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
            View Courses →
          </a>
        </div>

        <div className={styles.adminCard}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👥</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Users
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Manage students, instructors, and admins
          </p>
          <a href="/admin/users" className={styles.navLink} style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
            View Users →
          </a>
        </div>

        <div className={styles.adminCard}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🏛️</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
            Structure
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Manage faculties and departments
          </p>
          <a href="/admin/faculties" className={styles.navLink} style={{ color: 'var(--primary-color)', fontWeight: '600' }}>
            View Structure →
          </a>
        </div>
      </div>
    </div>
  );
}
