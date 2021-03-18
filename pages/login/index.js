import Head from 'next/head';
import SectionHeading from '../../components/SectionHeading';
import styles from '../../styles/Login.module.css';
import FormLabel from './FormLabel';

function Login() {
    return (
        <section className={styles['login-section']}>
            <Head>
                <title>Log in | Schooleo</title>
            </Head>
            <div className={styles['login-page']}>
                <SectionHeading>Login</SectionHeading>
                <form className={styles['login-form']}>
                    <FormLabel type="text" id="schoolName">
                        School Name
                    </FormLabel>
                    <FormLabel type="text" id="schoolAddress">
                        School Address
                    </FormLabel>
                    <FormLabel type="text" id="principalName">
                        Principal Name
                    </FormLabel>
                    <FormLabel type="email" id="email">
                        Email
                    </FormLabel>
                </form>
            </div>
        </section>
    );
}

export default Login;
