import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';
import { useEffect, useState } from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';

function ClassroomContent({ classroom, classroomDetails }) {
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    const [width, setWidth] = useState(1024);
    useEffect(() => {
        setWidth(innerWidth);
        const handler = () => {
            setWidth(innerWidth);
            setIsColumnOpen(false);
        };
        addEventListener('resize', handler);
        return () => removeEventListener('resize', handler);
    }, []);
    return (
        <div className={styles['classroom-content']}>
            {width <= 730 && (
                <div
                    className={styles['open-functional-column-button']}
                    onClick={() => setIsColumnOpen(!isColumnOpen)}
                >
                    {!isColumnOpen ? (
                        <FaEllipsisV
                            className={styles['open-functional-column-svg']}
                        />
                    ) : (
                        <FaTimes
                            className={styles['open-functional-column-svg']}
                        />
                    )}
                </div>
            )}
            <FunctionalColumn
                isColumnOpen={isColumnOpen}
                classroomDetails={classroomDetails}
            />
            <ClassroomStream classroom={classroom} />
        </div>
    );
}

export default ClassroomContent;
