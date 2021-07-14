import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Settings.module.css';
import Head from 'next/head';

function Settings() {
  const { user, setUserCursorType } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <section className={styles['settings-section']}>
      <Head>
        <title>Settings • Schooleo</title>
      </Head>
      <h1 className={styles['settings-section-heading']}>Settings</h1>
      <div className={styles['setting']}>
        <div className={styles['setting-heading']}>Change Cursor</div>
        <div className={styles['setting-options']}>
          <div
            className={styles['setting-option']}
            onClick={() => setUserCursorType('default')}
          >
            Default
          </div>
          <div
            className={styles['setting-option']}
            onClick={() => setUserCursorType('custom')}
          >
            Custom
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
