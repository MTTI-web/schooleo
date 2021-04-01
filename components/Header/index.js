import styles from '../../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context';
import CurrentUser from './CurrentUser';
import OpenNav from './OpenNav';
import { useEffect, useState } from 'react';

function Header() {
    const router = useRouter();
    const { user, setCursorType } = useGlobalContext();
    const [isNavOpen, setIsNavOpen] = useState(false);
    useEffect(() => {
        const handler = () => {
            setIsNavOpen(false);
        };
        addEventListener('resize', handler);
        () => removeEventListener('resize', handler);
    }, []);
    return (
        <header className={styles.header}>
            <h1 className={styles['app-name']}>Schooleo</h1>
            <nav
                className={styles.nav}
                style={
                    isNavOpen && window.innerWidth <= 680
                        ? { opacity: '100%', pointerEvents: 'all' }
                        : { opacity: '0', pointerEvents: 'none' }
                }
            >
                <ul className={styles['nav-links']}>
                    <li
                        onClick={() => {
                            router.replace('/');
                            setIsNavOpen(false);
                        }}
                        className={styles['nav-link']}
                        onMouseOver={() => setCursorType('pointer')}
                        onMouseLeave={() => setCursorType('default')}
                    >
                        Home
                    </li>
                    {user ? (
                        <li
                            onClick={() => {
                                router.replace('/classrooms');
                                setIsNavOpen(false);
                            }}
                            className={styles['nav-link']}
                            onMouseOver={() => setCursorType('pointer')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            Classrooms
                        </li>
                    ) : null}
                    {!user ? (
                        <>
                            <li
                                onClick={() => {
                                    router.replace('/sign_up');
                                    setIsNavOpen(false);
                                }}
                                className={styles['nav-link']}
                                onMouseOver={() => setCursorType('pointer')}
                                onMouseLeave={() => setCursorType('default')}
                            >
                                Sign up
                            </li>{' '}
                            <li
                                onClick={() => {
                                    router.replace('/sign_in');
                                    setIsNavOpen(false);
                                }}
                                className={styles['nav-link']}
                                onMouseOver={() => setCursorType('pointer')}
                                onMouseLeave={() => setCursorType('default')}
                            >
                                Sign in
                            </li>
                        </>
                    ) : null}
                </ul>
                {user ? <CurrentUser setIsNavOpen={setIsNavOpen} /> : null}
            </nav>
            <OpenNav setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
        </header>
    );
}

export default Header;
