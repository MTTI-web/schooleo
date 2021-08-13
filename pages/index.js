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
  const { user, setUser, setLoadingSession, log } = useGlobalContext();
  useEffect(async () => {
    const session = await signInWithSession(user, setLoadingSession);
    if (session.success) {
      setUser(session.user);
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
            I don't know whether you know that I know web development or not,
            but just telling, I know web dev and I made this website.
          </div>
        </div>
      </div>
      <AboutUsSection />
    </Section>
  );
}
