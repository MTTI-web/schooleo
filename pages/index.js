import Head from 'next/head';
import { useEffect } from 'react';
import changeCursor from '../utils/changeCursor';
import AboutUsSection from '../components/AboutUsSection';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Home.module.css';
import fetchAPI from '../utils/fetchAPI';
import classnames from 'classnames';

export default function Home() {
  const { user, setUser } = useGlobalContext();
  useEffect(async () => {
    if (!user) {
      const userEmailFromLocalStorage = JSON.parse(
        localStorage.getItem('user')
      );
      console.log(
        `User email from Local Storage: ${userEmailFromLocalStorage}`
      );

      if (userEmailFromLocalStorage) {
        const userData = await fetchAPI({
          url: '/auth/get_user',
          method: 'post',
          body: { email: userEmailFromLocalStorage },
        });
        console.log('User from Local Storage:', userData);
        if (userData && userData.success) {
          setUser(userData.user);
        } else {
          console.log('Could not find user in DB.');
        }
      }
    }
  }, []);
  return (
    <section
      className={styles['homepage']}
      style={
        user && user.settings.cursorType === 'default'
          ? { cursor: 'auto' }
          : { cursor: 'none' }
      }
    >
      <Head>
        <title>Schooleo</title>
      </Head>
      <div className={styles['landing-section']}>
        <div className={styles['app-hero']}>
          <div
            className={styles['app-name']}
            onMouseMove={(e) => {
              changeCursor(e.currentTarget, user.settings.cursorType);
            }}
          >
            Schooleo
          </div>
          <div className={styles['app-description']}>
            I don't know whether you know that I know web development or not,
            but just telling, I know web dev and I made this website.
          </div>
        </div>
      </div>
      <AboutUsSection />
    </section>
  );
}
