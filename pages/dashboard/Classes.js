import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import styles from '../../styles/Classes.module.css';
import fetchAPI from '../../utils/fetchAPI';

function Classes() {
    const { user, setCursorType, setUser } = useGlobalContext();
    const router = useRouter();
    const [classrooms, setClassrooms] = useState([]);
    useEffect(() => {
        if (user) {
            if (user.userType === 'student') {
                console.log(user.classrooms);
                user.classrooms.forEach(async (classroom) => {
                    console.log(
                        'Getting details for the classroom:',
                        classroom
                    );
                    const classroomFromAPI = await fetchAPI({
                        url: '/class/get_details',
                        method: 'post',
                        body: {
                            classroomID: classroom.creationTime,
                            userType: 'teacher',
                            email: classroom.teacherEmail,
                        },
                    });
                    console.log('Classroom from API:', classroomFromAPI);
                    if (classroomFromAPI.success) {
                        setClassrooms([
                            ...classrooms,
                            classroomFromAPI.classroom,
                        ]);
                        setUser({
                            ...user,
                            classrooms: [
                                classroomFromAPI.classroom,
                                ...user.classrooms.filter(
                                    (classroom) =>
                                        classroom.creationTime !==
                                        classroomFromAPI.classroom.creationTime
                                ),
                            ],
                        });
                    } else if (
                        classroomFromAPI.message === 'Classroom does not exist'
                    ) {
                        if (user.classrooms.length) {
                            setUser({
                                ...user,
                                classrooms: user.classrooms.filter(
                                    (classroom) =>
                                        classroom?.creationTime !==
                                        classroomFromAPI?.classroom
                                            ?.creationTime
                                ),
                            });
                        }
                    }
                });
            } else if (user.userType === 'teacher') {
                setClassrooms(user.classrooms);
            }
        }
    }, []);
    useEffect(() => {
        console.log('Classrooms:', classrooms);
    }, [classrooms]);
    return user ? (
        <div className={styles['class-list-section']}>
            <h2 className={styles['class-section-heading']}>Classrooms</h2>
            {user && classrooms.length ? (
                <div className={styles.classList}>
                    {classrooms.map((classItem, index) => {
                        if (classItem) {
                            return (
                                <div
                                    className={styles.class}
                                    key={index}
                                    onClick={() => {
                                        router.replace(
                                            `/classroom/${classItem.creationTime}`
                                        );
                                        setCursorType('default');
                                    }}
                                    onMouseOver={() => setCursorType('pointer')}
                                    onMouseLeave={() =>
                                        setCursorType('default')
                                    }
                                >
                                    <div className={styles['class-name']}>
                                        {classItem.name}
                                    </div>
                                    <div className={styles['class-details']}>
                                        <div
                                            className={styles['class-subject']}
                                        >
                                            <div
                                                className={
                                                    styles['detail-title']
                                                }
                                            >
                                                Subject:
                                            </div>
                                            {classItem.subject}
                                        </div>
                                    </div>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            ) : (
                <div className={styles['no-classes-message']}>
                    <h3>You have no classrooms right now.</h3>
                    <button
                        type="button"
                        onClick={() => {
                            router.replace(
                                user.userType === 'teacher'
                                    ? '/create_classroom'
                                    : '/join_classroom'
                            );
                            setCursorType('default');
                        }}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        {user.userType === 'teacher'
                            ? 'Create One'
                            : 'Join One'}
                    </button>
                </div>
            )}
        </div>
    ) : null;
}

export default Classes;
