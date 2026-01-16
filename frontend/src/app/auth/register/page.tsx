'use client';

import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "../../page.module.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      login(data.access_token, data.user);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <Link href="/" className={styles.backLink}>← Back to Home</Link>
        <div className={styles.authLogo}>🎓</div>
        <h1 className={styles.authTitle}>Join Us</h1>
        <p className={styles.authSubtitle}>Create your account to start learning</p>

        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                style={{ textAlign: 'left' }}
                className={styles.input}
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                style={{ textAlign: 'left' }}
                className={styles.input}
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>

        <div className={styles.authFooter}>
          Already have an account? <Link href="/auth/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
