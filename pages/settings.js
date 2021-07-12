import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Settings.module.css';

function Settings() {
  const { user } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <section className={styles['settings-section']}>
      <h1 className={styles['settings-section-heading']}>Settings</h1>
      <div className={styles['setting']}>
        <div className={styles['setting-heading']}>Change Cursor</div>
        <div className={styles['setting-options']}>
          <div className={styles['setting-option']}>Default</div>
          <div className={styles['setting-option']}>Custom</div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
