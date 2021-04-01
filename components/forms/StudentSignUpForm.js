import FormLabel from '../../components/FormLabel';
import FormSubmitButton from '../../components/FormSubmitButton';
import countries from '../../data/countries';
import Dropdown from '../../components/Dropdown';
import SectionHeading from '../../components/SectionHeading';
import styles from '../../styles/SignUpForm.module.css';
import { useGlobalContext } from '../context';
import { useRouter } from 'next/router';
import { useState } from 'react';
import fetchAPI from '../../utils/fetchAPI';

function StudentSignUpForm({ setUserType }) {
    const [country, setCountry] = useState(null);
    const { setUser, setCursorType } = useGlobalContext();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setCursorType('default');
        console.log('Student name:', e.currentTarget.studentName.value);
        if (country) {
            setLoading(true);
            const userData = await fetchAPI({
                url: '/auth/student/sign_up',
                method: 'post',
                body: {
                    username: e.currentTarget.studentName.value,
                    email: e.currentTarget.email.value,
                    password: e.currentTarget.password.value,
                    nationality: country,
                },
            });
            setLoading(false);
            console.log('User:', userData.user);
            setUser(userData.user);
            router.replace('/classrooms');
        }
    };
    return (
        <form
            className={styles['sign-up-form']}
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div
                className={styles['back-button']}
                onClick={() => setUserType(undefined)}
                onMouseOver={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
            >
                ←
            </div>
            <SectionHeading>Student Sign Up</SectionHeading>
            <FormLabel type="text" id="studentName">
                Your Name
            </FormLabel>
            <FormLabel type="email" id="email">
                Email
            </FormLabel>
            <FormLabel type="password" id="password">
                Password
            </FormLabel>
            <Dropdown
                setOption={setCountry}
                options={countries}
                option={country}
                title="Country"
            />
            <FormSubmitButton disabled={loading}>
                Create Account
            </FormSubmitButton>
        </form>
    );
}

export default StudentSignUpForm;
