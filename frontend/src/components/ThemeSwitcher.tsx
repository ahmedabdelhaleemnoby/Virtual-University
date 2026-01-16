'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher}>
      <button
        onClick={() => setTheme('light')}
        className={`${styles.themeBtn} ${theme === 'light' ? styles.active : ''}`}
        title="Light Mode"
      >
        ☀️
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`${styles.themeBtn} ${theme === 'dark' ? styles.active : ''}`}
        title="Dark Mode"
      >
        🌙
      </button>
      <button
        onClick={() => setTheme('auto')}
        className={`${styles.themeBtn} ${theme === 'auto' ? styles.active : ''}`}
        title="Auto Mode"
      >
        🔄
      </button>
    </div>
  );
}
