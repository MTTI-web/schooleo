import { useGlobalContext } from '../context';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/CurrentUser.module.css';

function CurrentUser({ setIsNavOpen }) {
  const { user, setCursorType } = useGlobalContext();
  const router = useRouter();
  const [showSignOutButton, setShowSignOutButton] = useState(false);
  return (
    <div
      className={styles['current-user']}
      onMouseEnter={() => {
        setShowSignOutButton(true);
        setCursorType('pointer');
      }}
      onMouseLeave={() => {
        setShowSignOutButton(false);
        setCursorType('default');
      }}
    >
      <span
        style={{
          color: '#fff',
          fontWeight: '600',
          marginRight: '5px',
          marginBottom: '5px',
        }}
      >
        @
      </span>{' '}
      {user.username}
      <div
        className={styles['sign-out-button']}
        style={showSignOutButton ? { opacity: '100%' } : null}
        onClick={() => {
          router.replace('/user_info');
          setIsNavOpen(false);
        }}
      >
        Account
      </div>
    </div>
  );
}

export default CurrentUser;
