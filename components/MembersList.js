import styles from '../styles/MembersList.module.css';
import { useGlobalContext } from './context';

function MembersList({ students, style = {}, setShowMembers }) {
  const { setCursorType } = useGlobalContext();
  return (
    <div className={styles['members-list-container']} style={style}>
      <button
        className={styles['close-members-list-button']}
        type="button"
        onClick={() => {
          setShowMembers(false);
          setCursorType('default');
        }}
        onMouseMove={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
      >
        &times;
      </button>
      <div className={styles['members-list-heading']}>
        Members
        <div className={styles['title-underline']}></div>
      </div>
      <ol className={styles['members-list']}>
        {students.map(({ name }, index) => (
          <li className={styles['member']} key={index}>
            {name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MembersList;
