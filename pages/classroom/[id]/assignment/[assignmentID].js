import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../components/context';
import NoQuestionsMessage from '../../../../components/NoQuestionsMessage';
import styles from '../../../../styles/CreateAssignment.module.css';
import CreateButton from '../../../../components/CreateButton';
import AssignmentQuestion from '../../../../components/AssignmentQuestion';
import Loader from '../../../../components/Loader';
import fetchAPI from '../../../../utils/fetchAPI';

function CreateAssignment() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const [assignment, setAssignment] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        if (!user) {
            router.replace('/');
        }
        setLoading(true);
        let teacherEmail = '';
        if (user && user.userType === 'student') {
            const classroomData = await fetchAPI({
                url: '/class/get_details',
                method: 'post',
                body: {
                    email: user.email,
                    userType: user.userType,
                    classroomID: router.query.id,
                },
            });
            console.log('Classroom Data:', classroomData);
            teacherEmail = classroomData.classroom.teacherEmail;
        } else {
            teacherEmail = user ? user.email : null;
        }
        const assignmentData = await fetchAPI({
            url: '/class/assignment/get_details',
            method: 'post',
            body: {
                classroomID: router.query.id,
                assignmentID: router.query.assignmentID,
                teacherEmail: teacherEmail,
            },
        });
        console.log('Assignment Data:', assignmentData);
        if (assignmentData.success) {
            setAssignment(assignmentData.assignment);
            setLoading(false);
        }
    }, []);
    const handleCreateQuestionButtonClick = () => {
        const newQuestion = {
            question: '',
            answer: '',
        };
        setAssignment({
            ...assignment,
            questions: [...assignment.questions, newQuestion],
        });
    };
    return (
        <section className={styles['create-assignment-section']}>
            <Head>
                <title>
                    {loading ? 'Loading...' : `${assignment.name} • Schooleo`}
                </title>
            </Head>
            {!loading ? (
                assignment.questions?.length ? (
                    <form className={styles['questions-form']}>
                        {assignment.questions.map((question, index) => (
                            <AssignmentQuestion
                                question={question}
                                key={index}
                            />
                        ))}
                    </form>
                ) : (
                    <NoQuestionsMessage
                        handleClick={handleCreateQuestionButtonClick}
                    />
                )
            ) : (
                <Loader />
            )}

            <CreateButton handleClick={handleCreateQuestionButtonClick} />
        </section>
    );
}

export default CreateAssignment;
