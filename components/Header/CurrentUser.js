import { useGlobalContext } from '../context';
import { useState } from 'react';
import styles from '../../styles/CurrentUser.module.css';

function CurrentUser() {
    const { user, setUser, setCursorType } = useGlobalContext();
    const [showSignOutButton, setShowSignOutButton] = useState(false);
    return (
        <div
            className={styles['current-user']}
            onMouseOver={() => {
                setShowSignOutButton(true);
                setCursorType('pointer');
            }}
            onMouseLeave={() => {
                setShowSignOutButton(false);
                setCursorType('default');
            }}
        >
            {user.username}
            <div
                className={styles['sign-out-button']}
                style={showSignOutButton ? { opacity: '100%' } : null}
                onClick={() => {
                    setUser(null);
                    localStorage.setItem('user', null);
                }}
            >
                Sign Out
            </div>
        </div>
    );
}

export default CurrentUser;
