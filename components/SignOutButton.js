import { useGlobalContext } from './context';
import styles from '../styles/SignOutButton.module.css';
import RippleButton from '../components/RippleButton';

function SignOutButton() {
  const { setUser, setCursorType, showNotification } = useGlobalContext();
  return (
    <RippleButton
      onClick={() => {
        setUser(null);
        localStorage.setItem('user', null);
        showNotification('Signed out.');
        setCursorType('default');
      }}
      style={{
        position: 'absolute',
        right: '0',
        height: 'calc(100% - 6px)',
        fontSize: '0.9rem',
      }}
    >
      Sign Out
    </RippleButton>
  );
}

export default SignOutButton;
