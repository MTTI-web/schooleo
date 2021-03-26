import { useGlobalContext } from '../context';
import { useState } from 'react';
import styles from '../../styles/CurrentUser.module.css';

function CurrentUser() {
    const { user, setUser } = useGlobalContext();
    const [showSignOutButton, setShowSignOutButton] = useState(false);
    return (
        <div
            className={styles['current-user']}
            onMouseOver={() => setShowSignOutButton(true)}
            onMouseLeave={() => setShowSignOutButton(false)}
        >
            {user.username}
            <div
                className={styles['sign-out-button']}
                style={showSignOutButton ? { opacity: '100%' } : null}
                onClick={() => setUser(null)}
            >
                Sign Out
            </div>
        </div>
    );
}

export default CurrentUser;
