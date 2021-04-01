import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../../components/context';
import FormLabel from '../../components/FormLabel';
import FormSubmitButton from '../../components/FormSubmitButton';
import SectionHeading from '../../components/SectionHeading';
import styles from '../../styles/SignIn.module.css';
import fetchAPI from '../../utils/fetchAPI';
import { useState } from 'react';

function SignIn() {
    const { user, setUser, setCursorType } = useGlobalContext();
    const router = useRouter();
    const [doesUserExist, setDoesUserExist] = useState(true);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user) {
            router.replace('/classrooms');
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCursorType('default');
        setIsPasswordCorrect(true);
        setDoesUserExist(true);
        setLoading(true);
        const userData = await fetchAPI({
            url: '/auth/sign_in',
            method: 'post',
            body: {
                email: e.currentTarget.email.value,
                password: e.currentTarget.password.value,
            },
        });
        setLoading(false);
        console.log('Logged in user:', userData);
        if (userData.user) {
            setUser(userData.user);
        } else if (!userData.success) {
            if (userData.message === 'No user found') {
                setDoesUserExist(false);
            } else if (userData.message === 'Password is incorrect') {
                setIsPasswordCorrect(false);
            }
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
                    {!doesUserExist ? (
                        <p className={styles['status-message']}>
                            We could not find user with entered email.
                        </p>
                    ) : null}
                    <FormLabel type="password" id="password">
                        Password
                    </FormLabel>
                    {!isPasswordCorrect ? (
                        <p className={styles['status-message']}>
                            The password entered is incorrect.
                        </p>
                    ) : null}
                    <FormSubmitButton disabled={loading}>
                        {loading ? 'Loading...' : 'Sign In'}
                    </FormSubmitButton>
                </form>
            </div>
        </section>
    );
}

export default SignIn;
