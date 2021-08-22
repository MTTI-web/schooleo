import styles from '../../styles/FunctionalColumn.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context';
import fetchAPI from '../../utils/fetchAPI';
function FunctionalColumn({ isColumnOpen, classroomDetails }) {
  const [width, setWidth] = useState(1024);
  const router = useRouter();
  const classroomID = router.query.id;
  const { user, setCursorType, log, showNotification } = useGlobalContext();
  useEffect(() => {
    log(`The classroom ID is: ${classroomID}.`);
    setWidth(innerWidth);
    const handler = () => {
      setWidth(innerWidth);
    };
    addEventListener('resize', handler);
    return () => removeEventListener('resize', handler);
  }, []);
  const handleAssignmentCreation = async () => {
    showNotification('Creating Assignment...');
    const assignmentCreationTime = Date.now();
    const newAssignment = {
      creationTime: assignmentCreationTime,
      name: 'Untitled Assignment',
      questions: [],
      students: [
        ...classroomDetails.students.map((student) => {
          log(student);
          return {
            id: student.id,
            username: student.name,
            score: null,
          };
        }),
      ],
    };
    const apiData = await fetchAPI({
      url: '/class/assignment/create',
      body: {
        classroomID,
        assignment: newAssignment,
      },
      method: 'post',
    });
    if (apiData.success) {
      log('New assignment created:', apiData);
      showNotification('New assignment created.');
    } else {
      log('New assignment could not be created.');
      showNotification('New assignment could not be created.');
    }
    router.replace(
      `/classroom/${classroomID}/assignment/${assignmentCreationTime}/edit`
    );
  };
  return (
    <div
      className={styles['functional-column']}
      style={
        width <= 730 && !isColumnOpen
          ? { opacity: 0, pointerEvents: 'none' }
          : { opacity: '100%', pointerEvents: 'all' }
      }
    >
      <div className={styles['assignments-title']}>Assignments</div>
      <div className={styles['assignments-container']}>
        {classroomDetails.assignments.length > 0 ? (
          classroomDetails.assignments.map(({ name, creationTime }, index) => (
            <div
              key={index}
              className={styles.assignment}
              onClick={() => {
                setCursorType('default');
                router.replace(
                  `/classroom/${classroomID}/assignment/${creationTime}/${
                    user.userType === 'teacher' ? 'edit' : 'attempt'
                  }`
                );
              }}
              style={{ animationDelay: `${(index + 1.5) / 10}s` }}
              onMouseEnter={() => setCursorType('pointer')}
              onMouseLeave={() => setCursorType('default')}
              onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
            >
              {name}
            </div>
          ))
        ) : (
          <div className={styles['no-assignments-message']}>
            There are no assignments right now.
          </div>
        )}
        {user && user.userType === 'teacher' && (
          <button
            className={styles['create-assignment-button']}
            onClick={handleAssignmentCreation}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            style={
              user && user.settings
                ? user.settings.cursorType === 'default'
                  ? { cursor: 'auto' }
                  : { cursor: 'none' }
                : { cursor: 'auto' }
            }
            style={{
              animationDelay: `${
                (classroomDetails.assignments.length * 1.5) / 10
              }s`,
            }}
            onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
          >
            Create Assignment
          </button>
        )}
      </div>
    </div>
  );
}
export default FunctionalColumn;
