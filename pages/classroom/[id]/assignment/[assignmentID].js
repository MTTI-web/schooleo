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
import { FaCheck, FaSave } from 'react-icons/fa';

function CreateAssignment() {
    const { user, setCursorType } = useGlobalContext();
    const router = useRouter();
    const [assignment, setAssignment] = useState({});
    const [loading, setLoading] = useState(true);
    const [classroom, setClassroom] = useState(null);
    const [showSavedAlert, setShowSavedAlert] = useState(true);
    useEffect(async () => {
        if (!user) {
            router.replace('/');
            return;
        }
        setLoading(true);
        const classData = await fetchAPI({
            url: '/class/get_details',
            method: 'post',
            body: {
                email: user.email,
                userType: user.userType,
                classroomID: router.query.id,
            },
        });
        console.log('Class data:', classData);
        if (classData.success) {
            setClassroom(classData.classroom);
            console.log('New classroom details set:', classData.classroom);
            setAssignment(
                classData.classroom.assignments.find(
                    ({ creationTime }) =>
                        creationTime === parseInt(router.query.assignmentID)
                )
            );
        } else {
            console.log('Could not find details for the given class.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        console.log('Assignment updated', assignment);
    }, [assignment]);

    const handleCreateQuestionButtonClick = () => {
        const newQuestion = {
            question: '',
            answer: '',
            index: assignment.questions.length,
        };
        console.log('New question:', newQuestion);
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
                <form
                    className={styles['questions-form']}
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const values = Array.from(
                            e.currentTarget.querySelectorAll('input')
                        ).map((input) => input.value);
                        console.log(values);
                        const apiData = await fetchAPI({
                            url: '/class/assignment/update',
                            method: 'post',
                            body: {
                                assignment,
                                teacherEmail:
                                    user.userType === 'teacher'
                                        ? user.email
                                        : classroom.teacherEmail,
                                classroomID: classroom.creationTime,
                                assignmentID: assignment.creationTime,
                            },
                        });
                        console.log('Assignment save data:', apiData);
                    }}
                >
                    <div className={styles['assignment-name-container']}>
                        <input
                            type="text"
                            name="assignmentName"
                            id="assignmentName"
                            value={assignment.name}
                            onMouseEnter={() => setCursorType('pointer')}
                            onMouseLeave={() => setCursorType('default')}
                            onInput={(e) => {
                                setAssignment({
                                    ...assignment,
                                    name: e.currentTarget.value,
                                });
                                setShowSavedAlert(false);
                            }}
                        />
                    </div>
                    {assignment.questions?.length ? (
                        assignment.questions.map((question, index) => (
                            <AssignmentQuestion
                                question={question}
                                key={index}
                                index={index}
                                setAssignment={setAssignment}
                                assignment={assignment}
                                setShowSavedAlert={setShowSavedAlert}
                            />
                        ))
                    ) : (
                        <NoQuestionsMessage
                            handleClick={handleCreateQuestionButtonClick}
                        />
                    )}
                    <button
                        type="submit"
                        className={styles['save-button']}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                        onClick={() => setShowSavedAlert(true)}
                    >
                        <div className={styles['saved-alert']}>
                            {showSavedAlert ? 'Saved' : 'Not Saved'}
                        </div>
                        {showSavedAlert ? <FaCheck /> : <FaSave />}
                    </button>
                </form>
            ) : (
                <Loader />
            )}

            <CreateButton handleClick={handleCreateQuestionButtonClick} />
        </section>
    );
}

export default CreateAssignment;
