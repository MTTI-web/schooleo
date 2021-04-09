import styles from '../../styles/FunctionalColumn.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context';
import fetchAPI from '../../utils/fetchAPI';

function FunctionalColumn({ isColumnOpen, classroomDetails }) {
    const [width, setWidth] = useState(1024);
    const router = useRouter();
    const classroomID = router.query.id;
    const { user, setCursorType } = useGlobalContext();
    useEffect(() => {
        console.log(`The classroom ID is: ${classroomID}.`);
        setWidth(innerWidth);
        const handler = () => {
            setWidth(innerWidth);
        };
        addEventListener('resize', handler);
        return () => removeEventListener('resize', handler);
    }, []);
    const handleAssignmentCreation = async () => {
        const assignmentCreationTime = Date.now();
        const newAssignment = {
            creationTime: assignmentCreationTime,
            name: 'Untitled Assignment',
            questions: [],
            studentsSubmitted: [],
        };
        const apiData = await fetchAPI({
            url: '/class/assignment/create',
            body: {
                teacherEmail: user.email,
                classroomID,
                assignment: newAssignment,
            },
            method: 'post',
        });
        if (apiData.success) {
            console.log('New assignment created:', apiData);
        } else {
            console.log('New assignment could not be created.');
        }
        router.replace(
            `/classroom/${classroomID}/assignment/${assignmentCreationTime}`
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
            Functional Column
            <div className={styles['assignments-container']}>
                {classroomDetails.assignments.map(({ name, creationTime }) => (
                    <div
                        className={styles.assignment}
                        onClick={() => {
                            setCursorType('default');
                            router.replace(
                                `/classroom/${classroomID}/assignment/${creationTime}`
                            );
                        }}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        {name}
                    </div>
                ))}
                {user && user.userType === 'teacher' && (
                    <button
                        className={styles['create-assignment-button']}
                        onClick={handleAssignmentCreation}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        Create Assignment
                    </button>
                )}
            </div>
        </div>
    );
}

export default FunctionalColumn;
