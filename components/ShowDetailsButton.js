import styles from '../styles/ShowDetailsButton.module.css';
import { useGlobalContext } from './context';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

function ShowDetailsButton({ showClassroomDetails, setShowClassroomDetails }) {
  const { setCursorType } = useGlobalContext();
  return (
    <div
      className={styles['show-details-button']}
      onClick={(e) => {
        if (!e.target.classList.contains('classroom-details'))
          setShowClassroomDetails(!showClassroomDetails);
      }}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
    >
      {showClassroomDetails ? <FaAngleUp /> : <FaAngleDown />}
    </div>
  );
}

export default ShowDetailsButton;
