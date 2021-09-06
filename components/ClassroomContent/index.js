import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';
import { useEffect, useState } from 'react';
import MembersList from '../MembersList';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';
import ClassroomNav from './ClassroomNav';

function ClassroomContent({ classroom, classroomDetails }) {
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [width, setWidth] = useState(1024);
  const [currentPage, setCurrentPage] = useState('stream');
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
            <FaEllipsisV className={styles['open-functional-column-svg']} />
          ) : (
            <FaTimes className={styles['open-functional-column-svg']} />
          )}
        </div>
      )}
      <ClassroomNav currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className={styles['classroom-page-container']}>
        <FunctionalColumn
          isColumnOpen={isColumnOpen}
          classroomDetails={classroomDetails}
          open={currentPage === 'assignments'}
        />
        <ClassroomStream
          classroom={classroom}
          open={currentPage === 'stream'}
        />
        <MembersList
          students={classroomDetails.students}
          style={
            currentPage === 'members'
              ? {
                  // right: '0',
                  pointerEvents: 'all',
                  opacity: '100%',
                }
              : {
                  // right: '-300px',
                  pointerEvents: 'none',
                  opacity: '0',
                }
          }
        />
      </div>
    </div>
  );
}

export default ClassroomContent;
