import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import fetchAPI from '../../utils/fetchAPI';
import styles from '../../styles/Class.module.css';
import Head from 'next/head';
import ClassroomContent from '../../components/ClassroomContent';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import MembersList from '../../components/MembersList';

function Class() {
    const router = useRouter();
    const { user, setCursorType } = useGlobalContext();
    const classroomID = router.query.id;
    const [loading, setLoading] = useState(true);
    const [classroomDetails, setClassroomDetails] = useState(null);
    const [showClassroomDetails, setShowClassroomDetails] = useState(false);
    const [copiedCodeStatus, setCopiedCodeStatus] = useState(false);
    const [showMembers, setShowMembers] = useState(false);

    useEffect(async () => {
        if (user) {
            const classData = await fetchAPI(
                user.userType === 'student'
                    ? {
                          url: '/class/get_details_from_teacher',
                          method: 'post',
                          body: {
                              email: user.email,
                              userType: user.userType,
                              classroomID,
                          },
                      }
                    : {
                          url: '/class/get_details',
                          method: 'post',
                          body: {
                              email: user.email,
                              userType: user.userType,
                              classroomID,
                          },
                      }
            );
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
    useEffect(() => {
        if (copiedCodeStatus) {
            const timeout = setTimeout(() => {
                setCopiedCodeStatus(false);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [copiedCodeStatus, setCopiedCodeStatus]);
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
                        {showClassroomDetails ? <FaAngleUp /> : <FaAngleDown />}
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
                            <div className={styles['classroom-join-code']}>
                                <span className={styles['detail-title']}>
                                    Join code:
                                </span>{' '}
                                {classroomDetails.creationTime}
                                <span
                                    className={styles['copied-code-status']}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            classroomDetails.creationTime
                                        );
                                        setCopiedCodeStatus(true);
                                    }}
                                    onMouseOver={() => setCursorType('pointer')}
                                    onMouseLeave={() =>
                                        setCursorType('default')
                                    }
                                >
                                    {copiedCodeStatus
                                        ? 'Copied to clipboard'
                                        : 'Copy join code'}
                                </span>
                            </div>
                            {user && user.userType === 'teacher' && (
                                <button
                                    type="button"
                                    onMouseOver={() => setCursorType('pointer')}
                                    onMouseLeave={() =>
                                        setCursorType('default')
                                    }
                                    onClick={() => {
                                        setShowMembers(true);
                                        setShowClassroomDetails(false);
                                    }}
                                    className={styles['show-members-button']}
                                >
                                    Show Members
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            {user && classroomDetails && (
                <>
                    {user.userType === 'teacher' && (
                        <MembersList
                            students={classroomDetails.students}
                            style={
                                showMembers
                                    ? {
                                          height: 'auto',
                                          overflowY: 'scroll',
                                          pointerEvents: 'all',
                                          opacity: '100%',
                                      }
                                    : {
                                          height: '0',
                                          overflowY: 'hidden',
                                          pointerEvents: 'none',
                                          opacity: '0',
                                      }
                            }
                            setShowMembers={setShowMembers}
                        />
                    )}
                    <ClassroomContent />
                </>
            )}
        </section>
    );
}

export default Class;
