import { useGlobalContext } from './context';
import styles from '../styles/NoQuestionsMessage.module.css';
import RippleButton from './RippleButton';

function NoQuestionsMessage({ handleClick }) {
  const { setCursorType, user } = useGlobalContext();
  return (
    <div className={styles['no-questions-message']}>
      <h3 style={user.userType === 'student' ? { marginBottom: '0' } : {}}>
        You have no questions in this assignment right now.
      </h3>
      {user.userType === 'teacher' && (
        <RippleButton
          type="button"
          onClick={() => {
            handleClick();
            setCursorType('default');
          }}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
        >
          Create Question
        </RippleButton>
      )}
    </div>
  );
}

export default NoQuestionsMessage;
