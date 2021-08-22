import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../components/context';
import SignOutButton from '../components/SignOutButton';
import styles from '../styles/UserInfo.module.css';
import Head from 'next/head';

function UserInfo() {
  const { user } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);
  return (
    <section
      className={styles['user-info-section']}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      <Head>
        <title>User Info</title>
      </Head>
      <div className={styles['section-heading']}>
        User Info
        <SignOutButton />
      </div>
      {user && (
        <div className={styles['user-info-content']}>
          <div
            className={styles['user-info-detail']}
            style={{ animationDelay: '0.1s' }}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
          >
            <div className={styles['user-info-detail-title']}>Account Type</div>
            <div className={styles['user-info-detail-content']}>
              {user.userType}
            </div>
          </div>
          <div
            className={styles['user-info-detail']}
            style={{ animationDelay: '0.2s' }}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
          >
            <div className={styles['user-info-detail-title']}>Username</div>
            <div className={styles['user-info-detail-content']}>
              {user.username}
            </div>
          </div>
          <div
            className={styles['user-info-detail']}
            style={{ animationDelay: '0.3s' }}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
          >
            <div className={styles['user-info-detail-title']}>Email</div>
            <div className={styles['user-info-detail-content']}>
              {user.email}
            </div>
          </div>
          <div
            className={styles['user-info-detail']}
            style={{ animationDelay: '0.4s' }}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
          >
            <div className={styles['user-info-detail-title']}>Nationality</div>
            <div className={styles['user-info-detail-content']}>
              {user.nationality}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default UserInfo;
