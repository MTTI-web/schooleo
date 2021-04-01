import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';
import { useEffect, useState } from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';

function ClassroomContent({ classroom }) {
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    const [width, setWidth] = useState(1024);
    useEffect(() => {
        setWidth(innerWidth);
        const handler = () => {
            setWidth(innerWidth);
        };
        addEventListener('resize', handler);
        return () => removeEventListener('resize', handler);
    }, []);
    return (
        <div className={styles['classroom-content']}>
            {width && (
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
            <FunctionalColumn isColumnOpen={isColumnOpen} />
            <ClassroomStream classroom={classroom} />
        </div>
    );
}

export default ClassroomContent;
