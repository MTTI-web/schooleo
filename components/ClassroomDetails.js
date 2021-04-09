import { useGlobalContext } from './context';
import styles from '../styles/ClassroomDetails.module.css';
import { useState, useEffect } from 'react';
import ShowMembersButton from './ShowMembersButton';

function ClassroomDetails({
    showClassroomDetails,
    classroomDetails,
    setShowClassroomDetails,
    setShowMembers,
}) {
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
            <div className={styles['classroom-subject']}>
                <span className={styles['detail-title']}>Subject:</span>{' '}
                {classroomDetails.subject}
            </div>
            <div className={styles['classroom-creation-time']}>
                <span className={styles['detail-title']}>
                    Classroom created at:
                </span>{' '}
                {new Date(classroomDetails.creationTime).toLocaleString()}
            </div>
            <div className={styles['classroom-join-code']}>
                <span className={styles['detail-title']}>Join code:</span>{' '}
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
                    onMouseLeave={() => setCursorType('default')}
                >
                    {copiedCodeStatus
                        ? 'Copied to clipboard'
                        : 'Copy join code'}
                </span>
            </div>
            {user && (
                <ShowMembersButton
                    setShowClassroomDetails={setShowClassroomDetails}
                    setShowMembers={setShowMembers}
                />
            )}
        </div>
    );
}

export default ClassroomDetails;
