'use client';

import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <h1 className={styles.logo}>🎓 Virtual University</h1>
          <div className={styles.navLinks}>
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

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Transform Your Future with Quality Education</h1>
          <p className={styles.heroSubtitle}>
            Join thousands of students learning from world-class instructors. 
            Start your journey to success today.
          </p>
          <div className={styles.heroActions}>
            <Link href="/courses" className={styles.heroPrimaryBtn}>
              Explore Courses
            </Link>
            {!user && (
              <Link href="/auth/register" className={styles.heroSecondaryBtn}>
                Get Started Free
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>Courses Available</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Active Students</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>Expert Instructors</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>95%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Virtual University?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📚</div>
              <h3>Comprehensive Curriculum</h3>
              <p>Structured courses across multiple disciplines to meet your learning goals.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎯</div>
              <h3>Learn at Your Pace</h3>
              <p>Flexible schedules that fit your lifestyle. Study anytime, anywhere.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🏆</div>
              <h3>Certified Programs</h3>
              <p>Earn recognized certificates upon completion to boost your career.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💼</div>
              <h3>Career Support</h3>
              <p>Get guidance and resources to help you achieve your professional goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
          <p className={styles.ctaSubtitle}>
            Join our community and unlock your potential today
          </p>
          <Link href="/courses" className={styles.ctaButton}>
            Browse All Courses
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2026 Virtual University. Empowering minds globally.</p>
      </footer>
    </div>
  );
}
