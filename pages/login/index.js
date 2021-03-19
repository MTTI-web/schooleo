import Head from 'next/head';
import SectionHeading from '../../components/SectionHeading';
import styles from '../../styles/Login.module.css';
import FormLabel from './FormLabel';
import FormSubmitButton from './FormSubmitButton';

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <section className={styles['login-section']}>
            <Head>
                <title>Log in • Schooleo</title>
            </Head>
            <div className={styles['login-page']}>
                <SectionHeading>Login</SectionHeading>
                <form
                    className={styles['login-form']}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <FormLabel type="text" id="schoolName" required>
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
                    <FormLabel type="password" id="password">
                        Password
                    </FormLabel>
                    <FormSubmitButton />
                </form>
            </div>
        </section>
    );
}

export default Login;
