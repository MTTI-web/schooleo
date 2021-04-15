import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import Loader from '../../components/Loader';
import styles from '../../styles/Classes.module.css';
import fetchAPI from '../../utils/fetchAPI';
import ClassroomListItem from '../../components/ClassroomListItem';
import NoClassesMessage from '../../components/NoClassesMessage';

function Classes({ loading, setLoading }) {
    const { user, setUser } = useGlobalContext();
    useEffect(() => {
        if (user) {
            if (user.userType === 'student') {
                if (user.classrooms.length) {
                    setLoading(true);
                    user.classrooms.forEach(async (classroom) => {
                        console.log(
                            'Getting details for the classroom:',
                            classroom
                        );
                        const classroomFromAPI = await fetchAPI({
                            url: '/class/get_details_from_teacher',
                            method: 'post',
                            body: {
                                classroomID: classroom.creationTime,
                                email: classroom.teacherEmail,
                            },
                        });
                        console.log('Classroom from API:', classroomFromAPI);
                        if (classroomFromAPI.success) {
                            setUser({
                                ...user,
                                classrooms: [
                                    classroomFromAPI.classroom,
                                    ...user.classrooms.filter(
                                        (classroom) =>
                                            classroom.creationTime !==
                                            classroomFromAPI.classroom
                                                .creationTime
                                    ),
                                ],
                            });
                        } else if (
                            classroomFromAPI.message ===
                            'Classroom does not exist'
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
                        setLoading(false);
                    });
                    return;
                }
                setLoading(false);
            } else if (user.userType === 'teacher') {
                setClassrooms(user.classrooms);
                setLoading(false);
            }
        }
    }, []);
    useEffect(() => {
        if (user) {
            console.log('User classrooms:', user.classrooms);
        }
    }, [user]);
    return user ? (
        <div
            className={styles['class-list-section']}
            style={loading ? { marginTop: '0' } : { marginTop: '40px' }}
        >
            {loading && <Loader />}
            {user && !loading && user.classrooms.length ? (
                <div className={styles.classList}>
                    {user.classrooms.map((classItem, index) => {
                        if (classItem) {
                            return (
                                <ClassroomListItem
                                    classItem={classItem}
                                    index={index}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            ) : (
                !loading && <NoClassesMessage />
            )}
        </div>
    ) : null;
}

export default Classes;
