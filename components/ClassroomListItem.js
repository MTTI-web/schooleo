import { useGlobalContext } from './context';
import styles from '../styles/Classes.module.css';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import fetchAPI from '../utils/fetchAPI';
import { useRouter } from 'next/router';

function ClassroomListItem({ classItem, index }) {
  const { user, setCursorType, setUser, log } = useGlobalContext();
  const [showMoreClassroomOptions, setShowMoreClassroomOptions] =
    useState(false);
  const router = useRouter();
  const handleClassroomLeave = async () => {
    const classroomLeaveData = await fetchAPI({
      url: '/class/leave',
      method: 'post',
      body: {
        studentEmail: user.email,
        teacherEmail: classItem.teacherEmail,
        classroomID: classItem.creationTime,
      },
    });
    log(classroomLeaveData);
    if (classroomLeaveData.success) {
      setUser(classroomLeaveData.student);
    }
  };
  return (
    <div
      className={styles.class}
      style={{ animationDelay: `${index / 10}s` }}
      onAnimationEnd={(e) => (e.currentTarget.style.opacity = '100%')}
      onClick={(e) => {
        log(
          !(
            e.target.closest('#more-classroom-options-button') ||
            e.target.closest('#more-classroom-options-container')
          )
        );
        if (
          !(
            e.target.closest('#more-classroom-options-button') ||
            e.target.closest('#more-classroom-options-container')
          )
        ) {
          router.replace(`/classroom/${classItem._id}`);
          setCursorType('default');
        }
      }}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
    >
      {user && user.userType === 'student' && (
        <>
          <div
            className={styles['more-classroom-options-button']}
            id="more-classroom-options-button"
            onClick={() => {
              setShowMoreClassroomOptions(!showMoreClassroomOptions);
            }}
          >
            {showMoreClassroomOptions ? <FaTimes /> : <FaEllipsisV />}
          </div>
          <div
            className={styles['more-classroom-options-container']}
            id="more-classroom-options-container"
            style={
              showMoreClassroomOptions
                ? {
                    opacity: '100%',
                    pointerEvents: 'all',
                  }
                : { opacity: '0', pointerEvents: 'none' }
            }
          >
            <div
              className={styles['more-classroom-option']}
              onClick={handleClassroomLeave}
            >
              Leave Classroom
            </div>
          </div>
        </>
      )}
      <div className={styles['class-name']}>{classItem.name}</div>
      <div className={styles['class-details']}>
        <div className={styles['class-subject']}>{classItem.subject}</div>
      </div>
    </div>
  );
}

export default ClassroomListItem;
