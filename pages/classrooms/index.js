import Head from 'next/head';
import styles from '../../styles/Classrooms.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import Classes from './Classes';
import CreateClassButton from '../../components/CreateButton';
import { useState } from 'react';
import signInWithSession from '../../utils/signInWithSession';

function Classrooms() {
  const { user, setUser, setLoadingSession, setCursorType, showNotification } =
    useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const session = await signInWithSession(user, setLoadingSession);
    if (session.success) {
      showNotification(`Signed in as ${session.user.email}`);
      setUser(session.user);
    }
  }, []);

  // useEffect(() => {
  //   if (!user) {
  //     router.replace('/');
  //   }
  // }, [user]);

  const handleClick = () => {
    router.replace(
      user.userType === 'teacher' ? '/create_classroom' : '/join_classroom'
    );
    setCursorType('default');
  };

  return (
    <section
      className={styles['dashboard']}
      style={
        loading
          ? {
              justifyContent: 'center',
            }
          : {
              justifyContent: 'normal',
            }
      }
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? loading
              ? { cursor: 'auto', justifyContent: 'center' }
              : { cursor: 'auto', justifyContent: 'normal' }
            : loading
            ? { cursor: 'none', justifyContent: 'center' }
            : { cursor: 'none', justifyContent: 'normal' }
          : loading
          ? { cursor: 'auto', justifyContent: 'center' }
          : { cursor: 'auto', justifyContent: 'normal' }
      }
    >
      <Head>
        <title>Classrooms • Schooleo</title>
      </Head>
      <h1 className={styles['section-heading']}>Classrooms</h1>
      <Classes loading={loading} setLoading={setLoading} />
      <CreateClassButton handleClick={handleClick} />
    </section>
  );
}

export default Classrooms;
