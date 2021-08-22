import Head from 'next/head';
import { useEffect } from 'react';
import changeCursor from '../utils/changeCursor';
import AboutUsSection from '../components/AboutUsSection';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Home.module.css';
import Section from '../components/Section';
import signInWithSession from '../utils/signInWithSession';
import { useRouter } from 'next/router';

// Home page
export default function Home() {
  const router = useRouter();
  const { user, setUser, setLoadingSession, log, showNotification } =
    useGlobalContext();
  useEffect(async () => {
    const session = await signInWithSession(user, setLoadingSession);
    if (session.success) {
      setUser(session.user);
      showNotification(`Signed in as ${session.user.email}`);
      router.replace('/classrooms');
    }
    log('Hello', 'World');
  }, []);
  return (
    <Section
      className={styles['homepage']}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      <Head>
        <title>Schooleo</title>
      </Head>
      <div className={styles['landing-section']}>
        <div className={styles['app-hero']}>
          <div className={styles['app-name']}>Schooleo</div>
          <div className={styles['app-description']}>
            A simple app to make all your school procedures simple. Track
            student's performance with tests and generate report cards as well!
          </div>
        </div>
      </div>
      <AboutUsSection />
    </Section>
  );
}
