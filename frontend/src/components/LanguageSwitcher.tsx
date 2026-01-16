'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.startsWith('/ar') ? 'ar' : 'en';

  const switchLanguage = (newLocale: string) => {
    const newPathname = currentLocale === 'en' 
      ? `/ar${pathname}`
      : pathname.replace('/ar', '');
    
    router.push(newLocale === 'ar' ? `/ar${pathname}` : pathname.replace('/ar', ''));
  };

  return (
    <div className={styles.languageSwitcher}>
      <button
        onClick={() => switchLanguage('en')}
        className={`${styles.langBtn} ${currentLocale === 'en' ? styles.active : ''}`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('ar')}
        className={`${styles.langBtn} ${currentLocale === 'ar' ? styles.active : ''}`}
      >
        AR
      </button>
    </div>
  );
}
