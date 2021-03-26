import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import fetchAPI from '../../utils/fetchAPI';
import styles from '../../styles/Class.module.css';
import Head from 'next/head';
import ClassroomContent from '../../components/ClassroomContent';
import { FaAngleDown } from 'react-icons/fa';

function Class() {
    const router = useRouter();
    const { user, setCursorType } = useGlobalContext();
    const classroomID = router.query.id;
    const [loading, setLoading] = useState(true);
    const [classroomDetails, setClassroomDetails] = useState(null);
    const [showClassroomDetails, setShowClassroomDetails] = useState(false);

    useEffect(async () => {
        if (user) {
            const classData = await fetchAPI({
                url: '/class/get_details',
                method: 'post',
                body: {
                    email: user.email,
                    userType: user.userType,
                    classroomID,
                },
            });
            setLoading(false);
            console.log('Class data:', classData);
            if (classData.success) {
                setClassroomDetails(classData.classroom);
                console.log('New classroom details set:', classData.classroom);
            } else {
                console.log('Could not find details for the given class.');
            }
        } else {
            router.replace('/');
        }
    }, [user]);
    return (
        <section className={styles['classroom-section']}>
            <Head>
                <title>
                    {classroomDetails
                        ? `${classroomDetails.name} • Schooleo`
                        : 'Loading...'}
                </title>
            </Head>
            <div className={styles['classroom-header']}>
                <div className={styles['main-header-items']}>
                    <div
                        className={styles['back-button']}
                        onClick={() => {
                            router.replace('/dashboard');
                            setCursorType('default');
                        }}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        ←
                    </div>
                    {!loading && classroomDetails
                        ? classroomDetails.name
                        : 'Loading...'}
                    <div
                        className={styles['show-details-button']}
                        onClick={(e) => {
                            if (
                                !e.target.classList.contains(
                                    'classroom-details'
                                )
                            )
                                setShowClassroomDetails(!showClassroomDetails);
                        }}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        <FaAngleDown />
                    </div>
                </div>
                {classroomDetails && (
                    <>
                        <div
                            className={styles['classroom-details']}
                            style={
                                showClassroomDetails
                                    ? {
                                          top: '50px',
                                          opacity: '100%',
                                          pointerEvents: 'all',
                                          color: '#121212',
                                      }
                                    : {
                                          top: '-100%',
                                          opacity: '0',
                                          pointerEvents: 'none',
                                          color: '#0da3bf',
                                      }
                            }
                        >
                            <div className={styles['classroom-subject']}>
                                <span className={styles['detail-title']}>
                                    Subject:
                                </span>{' '}
                                {classroomDetails.subject}
                            </div>
                            <div className={styles['classroom-creation-time']}>
                                <span className={styles['detail-title']}>
                                    Classroom created at:
                                </span>{' '}
                                {new Date(
                                    classroomDetails.creationTime
                                ).toLocaleString()}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <ClassroomContent />
        </section>
    );
}

export default Class;
