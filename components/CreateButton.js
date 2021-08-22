import { useRouter } from 'next/router';
import { useGlobalContext } from './context';
import styles from '../styles/CreateClassButton.module.css';

function CreateButton({ handleClick }) {
  const { user } = useGlobalContext();
  const { setCursorType } = useGlobalContext();
  return user ? (
    <button
      type="button"
      className={styles['create-class-button']}
      title={user.userType === 'teacher' ? 'Create Class' : 'Join Class'}
      onClick={() => {
        handleClick();
        setCursorType('default');
      }}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      +
    </button>
  ) : null;
}

export default CreateButton;
