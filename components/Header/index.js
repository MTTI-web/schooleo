import styles from '../../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context';
import CurrentUser from './CurrentUser';

function Header() {
    const router = useRouter();
    const { user } = useGlobalContext();
    return (
        <header className={styles.header}>
            <h1 className={styles['app-name']}>Schooleo</h1>
            <nav className={styles.nav}>
                <ul className={styles['nav-links']}>
                    <li
                        onClick={() => router.replace('/')}
                        className={styles['nav-link']}
                    >
                        Home
                    </li>
                    {user ? (
                        <li
                            onClick={() => router.replace('/dashboard')}
                            className={styles['nav-link']}
                        >
                            Dashboard
                        </li>
                    ) : null}
                    {!user ? (
                        <>
                            <li
                                onClick={() => router.replace('/sign_up')}
                                className={styles['nav-link']}
                            >
                                Sign up
                            </li>{' '}
                            <li
                                onClick={() => router.replace('/sign_in')}
                                className={styles['nav-link']}
                            >
                                Sign in
                            </li>
                        </>
                    ) : null}
                </ul>
                {user ? <CurrentUser /> : null}
            </nav>
        </header>
    );
}

export default Header;
