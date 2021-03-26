import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../../components/context';
import FormLabel from '../../components/FormLabel';
import FormSubmitButton from '../../components/FormSubmitButton';
import SectionHeading from '../../components/SectionHeading';
import styles from '../../styles/SignIn.module.css';
import fetchAPI from '../../utils/fetchAPI';

function SignIn() {
    const { user, setUser } = useGlobalContext();
    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.replace('/dashboard');
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = await fetchAPI({
            url: '/auth/teacher/sign_in',
            method: 'post',
            body: {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            },
        });
        console.log('Logged in user:', userData);
        if (userData.user) {
            setUser(userData.user);
        }
    };
    return (
        <section>
            <Head>
                <title>Sign In • Schooleo</title>
            </Head>
            <div className={styles['sign-in-page']}>
                <form
                    className={styles['sign-in-form']}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <SectionHeading>Sign In</SectionHeading>
                    <FormLabel type="email" id="email">
                        Email
                    </FormLabel>
                    <FormLabel type="password" id="password">
                        Password
                    </FormLabel>
                    <FormSubmitButton>Sign In</FormSubmitButton>
                </form>
            </div>
        </section>
    );
}

export default SignIn;
