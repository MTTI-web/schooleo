import Head from 'next/head';
import SectionHeading from '../components/SectionHeading';
import styles from '../styles/JoinClassroom.module.css';
import FormLabel from '../components/FormLabel';
import FormSubmitButton from '../components/FormSubmitButton';
import { useEffect, useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { useGlobalContext } from '../components/context';
import { useRouter } from 'next/router';

function JoinClassroom() {
    const { user, setUser, setCursorType } = useGlobalContext();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPasswordCorrect(true);
        setLoading(true);
        console.log(`Join code: ${e.currentTarget.joinCode.value}`);
        const classroomData = await fetchAPI({
            url: '/class/join',
            method: 'post',
            body: {
                teacherEmail: e.currentTarget.teacherEmail.value,
                userEmail: user.email,
                password: e.currentTarget.password.value,
                joinCode: e.currentTarget.joinCode.value,
            },
        });
        setLoading(false);
        console.log('Classroom joining data from API:', classroomData);
        if (classroomData.success) {
            setUser(classroomData.user);
            router.replace('/dashboard');
            setCursorType('default');
        } else {
            if (!classroomData.isPasswordCorrect) {
                setIsPasswordCorrect(false);
                console.log(
                    'Password entered while joining classroom is wrong.'
                );
            }
        }
    };

    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);

    return (
        <section>
            <Head>
                <title>Join Classroom • Schooleo</title>
            </Head>
            <div className={styles['join-classroom-page']}>
                <form
                    className={styles['join-classroom-form']}
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <div
                        className={styles['back-button']}
                        onClick={() => router.replace('/dashboard')}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        ←
                    </div>
                    <SectionHeading>Join Classroom</SectionHeading>
                    <FormLabel type="email" id="teacherEmail">
                        Teacher's Email
                    </FormLabel>
                    <FormLabel type="password" id="joinCode">
                        Join Code
                    </FormLabel>
                    <FormLabel type="password" id="password">
                        Password
                    </FormLabel>
                    {!isPasswordCorrect ? (
                        <p className={styles['status-message']}>
                            The password entered is incorrect.
                        </p>
                    ) : null}
                    <FormSubmitButton disabled={loading}>
                        {loading ? 'Loading...' : 'Join Class'}
                    </FormSubmitButton>
                </form>
            </div>
        </section>
    );
}

export default JoinClassroom;
