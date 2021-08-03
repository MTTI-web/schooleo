import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../components/context';
import Loader from '../../components/Loader';
import styles from '../../styles/Classes.module.css';
import fetchAPI from '../../utils/fetchAPI';
import ClassroomListItem from '../../components/ClassroomListItem';
import NoClassesMessage from '../../components/NoClassesMessage';

function Classes({ loading, setLoading }) {
  const { user, setUser, log } = useGlobalContext();
  const [classrooms, setClassrooms] = useState(null);
  useEffect(() => {
    log('Current classrooms:', classrooms);
  }, [classrooms]);
  useEffect(async () => {
    setLoading(true);
    if (user) {
      log('User classrooms:', user.classrooms);
      if (user.classrooms.length) {
        const classroomPromisesFromAPI = await user.classrooms.map(
          async (classroom) => {
            log('Getting details for the classroom:', classroom);
            const classroomFromAPI = await fetchAPI({
              url: '/class/get_classroom_details',
              method: 'post',
              body: {
                classroomID: classroom,
              },
            });
            log('Classroom from API:', classroomFromAPI);
            if (classroomFromAPI && classroomFromAPI.success) {
              log('Successfully fetched classroom.');
              return classroomFromAPI.classroom;
            } else if (classroomFromAPI && !classroomFromAPI.classroom) {
              if (user.classrooms.length) {
                setUser({
                  ...user,
                  classrooms: user.classrooms.filter((currentClassroom) => {
                    log(currentClassroom, classroom);
                    return currentClassroom != classroom;
                  }),
                });
              }
            }
          }
        );
        const classroomsFromAPI = await Promise.all(classroomPromisesFromAPI);
        setLoading(false);
        log('Classrooms from API:', classroomsFromAPI);
        setClassrooms(classroomsFromAPI);
        return;
      }
    }
    setLoading(false);
  }, [user]);
  useEffect(() => {
    if (user) {
      log('User classrooms:', user.classrooms);
    }
  }, [user]);
  return user ? (
    <div
      className={styles['class-list-section']}
      style={loading ? { marginTop: '0' } : { marginTop: '40px' }}
    >
      {loading && <Loader />}
      {user &&
      !loading &&
      user.classrooms.filter((classroom) => classroom).length ? (
        <div className={styles.classList}>
          {classrooms
            ? classrooms.map((classItem, index) => {
                if (classItem) {
                  return (
                    <ClassroomListItem classItem={classItem} key={index} />
                  );
                } else {
                  return null;
                }
              })
            : null}
        </div>
      ) : (
        user &&
        !loading &&
        !user.classrooms.filter((classroom) => classroom).length && (
          <NoClassesMessage />
        )
      )}
    </div>
  ) : null;
}

export default Classes;
