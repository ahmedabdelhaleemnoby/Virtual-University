'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from '../page.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'ADMIN') {
    return <div className={styles.loading}>Verifying admin access...</div>;
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>VU ADMIN</div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navItem}>📊 Dashboard</Link>
          <Link href="/admin/faculties" className={styles.navItem}>🏛️ Faculties</Link>
          <Link href="/admin/departments" className={styles.navItem}>🏢 Departments</Link>
          <Link href="/admin/subjects" className={styles.navItem}>📚 Courses</Link>
          <Link href="/admin/users" className={styles.navItem}>👥 Users</Link>
          <Link href="/admin/students" className={styles.navItem}>🎓 Students</Link>
          <Link href="/" className={styles.navItem} style={{ marginTop: 'auto' }}>← Back to Site</Link>
        </nav>
      </aside>
      <main className={styles.adminMain}>
        <header className={styles.adminHeader}>
          <h2 className={styles.adminTitle}>Admin Portal</h2>
          <div className={styles.adminHeaderActions}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {user.firstName} {user.lastName}
            </span>
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
