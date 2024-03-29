import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../components/context';
import Head from 'next/head';
import styles from '../styles/CreateClass.module.css';
import SectionHeading from '../components/SectionHeading';
import FormLabel from '../components/FormLabel';
import FormSubmitButton from '../components/FormSubmitButton';
import fetchAPI from '../utils/fetchAPI';
import RippleButton from '../components/RippleButton';

function CreateClass() {
  const router = useRouter();
  const { user, setUser, log } = useGlobalContext();
  useEffect(() => {
    if (!user) {
      router.replace('/');
    } else if (user && user.userType !== 'teacher') {
      router.replace('/');
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.email) {
      log(`New class name is: ${e.currentTarget.className.value}`);
      const userData = await fetchAPI({
        url: '/class/create',
        method: 'post',
        body: {
          className: e.currentTarget.className.value,
          email: user.email,
          password: e.currentTarget.password.value,
          creationTime: Date.now(),
          subject: e.currentTarget.subject.value,
        },
      });
      log('New class created in DB:', userData);
      if (userData.user) {
        setUser(userData.user);
        router.replace('/classrooms');
      }
    }
  };
  return (
    <section
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      <Head>
        <title>Create Classroom • Schooleo</title>
      </Head>
      <div className={styles['create-class-page']}>
        <form
          className={styles['create-class-form']}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <SectionHeading>Create Class</SectionHeading>
          <FormLabel type="text" id="className">
            Class Name
          </FormLabel>
          <FormLabel type="text" id="subject">
            Subject
          </FormLabel>
          <FormLabel type="password" id="password">
            Password
          </FormLabel>
          <RippleButton style={{ marginTop: '20px' }}>
            Create Class
          </RippleButton>
        </form>
      </div>
    </section>
  );
}

export default CreateClass;
