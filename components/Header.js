import styles from '../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from './context';

function Header() {
    const router = useRouter();
    const { isSignedIn } = useGlobalContext();
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
                    {isSignedIn ? (
                        <li
                            onClick={() => router.replace('/dashboard')}
                            className={styles['nav-link']}
                        >
                            Dashboard
                        </li>
                    ) : null}
                    {!isSignedIn ? (
                        <>
                            <li
                                onClick={() => router.replace('/dashboard')}
                                className={styles['nav-link']}
                            >
                                Sign up
                            </li>{' '}
                            <li
                                onClick={() => router.replace('/login')}
                                className={styles['nav-link']}
                            >
                                Sign in
                            </li>
                        </>
                    ) : null}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
