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
  const { user, setUser, setLoadingSession, setCursorType } =
    useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const session = await signInWithSession(user, setLoadingSession);
    if (session.success) {
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
