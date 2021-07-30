import { useGlobalContext } from './context';
import styles from '../styles/ClassroomDetails.module.css';
import { useState, useEffect } from 'react';

function ClassroomDetails({ showClassroomDetails, classroomDetails }) {
  const [copiedCodeStatus, setCopiedCodeStatus] = useState(false);
  const { setCursorType, user } = useGlobalContext();

  useEffect(() => {
    if (copiedCodeStatus) {
      const timeout = setTimeout(() => {
        setCopiedCodeStatus(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [copiedCodeStatus, setCopiedCodeStatus]);

  return (
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
      <div className={styles['classroom-detail']}>
        <span className={styles['detail-title']}>Subject:</span>{' '}
        <span className={styles['detail-content']}>
          {classroomDetails.subject}
        </span>
      </div>
      <div className={styles['classroom-detail']}>
        <span className={styles['detail-title']}>Classroom created at:</span>{' '}
        <span className={styles['detail-content']}>
          {new Date(classroomDetails.creationTime).toLocaleDateString()}
        </span>
      </div>
      <div className={styles['classroom-detail']}>
        <span className={styles['detail-title']}>Join code:</span>{' '}
        <span className={styles['detail-content']}>{classroomDetails._id}</span>
        <span
          className={styles['copied-code-status']}
          onClick={() => {
            navigator.clipboard.writeText(classroomDetails._id);
            setCopiedCodeStatus(true);
          }}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          {copiedCodeStatus ? 'Copied to clipboard' : 'Copy join code'}
        </span>
      </div>
    </div>
  );
}

export default ClassroomDetails;
