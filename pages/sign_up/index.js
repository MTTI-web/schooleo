import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/SignUp.module.css';
import TeacherSignUpForm from '../../components/forms/TeacherSignUpForm';
import StudentSignUpForm from '../../components/forms/StudentSignUpForm';
import ChooseSignUpMethod from '../../components/ChooseSignUpMethod';

function SignUp() {
  const [userType, setUserType] = useState(undefined);
  const router = useRouter();
  return (
    <section className={styles['login-section']}>
      <Head>
        <title>Sign Up • Schooleo</title>
      </Head>
      <div className={styles['login-page']}>
        {!userType ? (
          <ChooseSignUpMethod setUserType={setUserType} />
        ) : userType === 'teacher' ? (
          <TeacherSignUpForm setUserType={setUserType} />
        ) : (
          <StudentSignUpForm setUserType={setUserType} />
        )}
      </div>
    </section>
  );
}

export default SignUp;
