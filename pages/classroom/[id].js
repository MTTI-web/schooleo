import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import fetchAPI from '../../utils/fetchAPI';
import styles from '../../styles/Class.module.css';
import Head from 'next/head';
import ClassroomContent from '../../components/ClassroomContent';
import MembersList from '../../components/MembersList';
import Loader from '../../components/Loader';
import ClassroomDetails from '../../components/ClassroomDetails';
import ShowDetailsButton from '../../components/ShowDetailsButton';
import ClassroomBackButton from '../../components/ClassroomBackButton';

function Class() {
    const router = useRouter();
    const { user, setCursorType } = useGlobalContext();
    const classroomID = router.query.id;
    const [loading, setLoading] = useState(true);
    const [classroomDetails, setClassroomDetails] = useState(null);
    const [showClassroomDetails, setShowClassroomDetails] = useState(false);
    const [showMembers, setShowMembers] = useState(false);

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
        <section
            className={styles['classroom-section']}
            style={
                loading
                    ? {
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                      }
                    : {
                          display: 'block',
                          justifyContent: 'none',
                          alignItems: 'normal',
                      }
            }
        >
            <Head>
                <title>
                    {classroomDetails
                        ? `${classroomDetails.name} • Schooleo`
                        : 'Loading...'}
                </title>
            </Head>
            {!loading ? (
                <>
                    <div className={styles['classroom-header']}>
                        <div className={styles['main-header-items']}>
                            <ClassroomBackButton />
                            {classroomDetails && classroomDetails.name}
                            <ShowDetailsButton
                                showClassroomDetails={showClassroomDetails}
                                setShowClassroomDetails={
                                    setShowClassroomDetails
                                }
                            />
                        </div>
                        {classroomDetails && (
                            <ClassroomDetails
                                showClassroomDetails={showClassroomDetails}
                                classroomDetails={classroomDetails}
                                setShowClassroomDetails={
                                    setShowClassroomDetails
                                }
                                setShowMembers={setShowMembers}
                            />
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
                            <ClassroomContent classroom={classroomDetails} />
                        </>
                    )}
                </>
            ) : (
                <Loader />
            )}
        </section>
    );
}

export default Class;
