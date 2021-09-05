import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';
import { useEffect, useState } from 'react';
import { FaEllipsisV, FaTimes } from 'react-icons/fa';

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
      <aside className={styles['classroom-page-nav-container']}>
        <nav className={styles['classroom-page-nav']}>
          <div
            className={styles['classroom-page-nav-link']}
            style={
              currentPage === 'stream'
                ? {
                    borderLeftColor: '#0ff',
                    borderLeftWidth: '2px',
                    backgroundColor: '#ffffff30',
                  }
                : {}
            }
            onClick={() => setCurrentPage('stream')}
          >
            Stream
          </div>
          <div
            className={styles['classroom-page-nav-link']}
            onClick={() => setCurrentPage('assignments')}
            style={
              currentPage === 'assignments'
                ? {
                    borderLeft: '2px solid #0ff',
                    backgroundColor: '#ffffff30',
                    borderLeftWidth: '2px',
                  }
                : {}
            }
          >
            Assignments
          </div>
        </nav>
      </aside>
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
      </div>
    </div>
  );
}

export default ClassroomContent;
