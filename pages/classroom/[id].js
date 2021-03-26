import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import fetchAPI from '../../utils/fetchAPI';
import styles from '../../styles/Class.module.css';
import Head from 'next/head';
import ClassroomContent from '../../components/ClassroomContent';

function Class() {
    const router = useRouter();
    const { user } = useGlobalContext();
    const classroomID = router.query.id;
    const [loading, setLoading] = useState(true);
    const [classroomDetails, setClassroomDetails] = useState(null);

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
            {!loading && classroomDetails ? (
                <>
                    <Head>
                        <title>{classroomDetails.name} • Schooleo</title>
                    </Head>
                    <div className={styles['classroom-name']}>
                        {classroomDetails.name}
                    </div>
                </>
            ) : (
                <h1>Loading</h1>
            )}
            <ClassroomContent />
        </section>
    );
}

export default Class;
