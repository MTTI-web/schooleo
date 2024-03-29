import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../components/context';
import fetchAPI from '../../../utils/fetchAPI';
import styles from '../../../styles/Class.module.css';
import Head from 'next/head';
import ClassroomContent from '../../../components/ClassroomContent';
import MembersList from '../../../components/MembersList';
import Loader from '../../../components/Loader';
import ClassroomDetails from '../../../components/ClassroomDetails';
import ShowDetailsButton from '../../../components/ShowDetailsButton';
import ClassroomBackButton from '../../../components/ClassroomBackButton';
import OpenMembersListButton from '../../../components/OpenMembersListButton';

function Class() {
  const router = useRouter();
  const { user, log } = useGlobalContext();
  const [loadingStyles, setLoadingStyles] = useState({});
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
          classroomID,
        },
      });
      setLoading(false);
      log('Class data:', classData);
      if (classData.success) {
        setClassroomDetails(classData.classroom);
        log('New classroom details set:', classData.classroom);
      } else {
        log('Could not find details for the given class.');
      }
    } else {
      router.replace('/');
    }
  }, [user]);

  useEffect(() => {
    if (loading) {
      setLoadingStyles({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      });
    } else {
      setLoadingStyles({
        display: 'block',
        justifyContent: 'none',
        alignItems: 'normal',
      });
    }
  }, [loading]);

  return (
    <section
      className={styles['classroom-section']}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto', ...loadingStyles }
            : { cursor: 'none', ...loadingStyles }
          : { cursor: 'auto', ...loadingStyles }
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
                setShowClassroomDetails={setShowClassroomDetails}
              />
            </div>
            {classroomDetails && (
              <ClassroomDetails
                showClassroomDetails={showClassroomDetails}
                classroomDetails={classroomDetails}
              />
            )}
          </div>
          {user && classroomDetails && (
            <ClassroomContent
              classroom={classroomDetails}
              classroomDetails={classroomDetails}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default Class;
