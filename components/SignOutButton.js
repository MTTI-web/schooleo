import { useGlobalContext } from './context';
import styles from '../styles/SignOutButton.module.css';

function SignOutButton() {
  const { setUser, setCursorType, showNotification } = useGlobalContext();
  return (
    <div
      className={styles['sign-out-button']}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
      onClick={() => {
        setUser(null);
        localStorage.setItem('user', null);
        showNotification('Signed out.');
        setCursorType('default');
      }}
    >
      Sign Out
    </div>
  );
}

export default SignOutButton;
