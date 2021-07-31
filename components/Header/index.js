import styles from '../../styles/Header.module.css';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../context';
import CurrentUser from './CurrentUser';
import OpenNav from './OpenNav';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import UserMessage from '../UserMessage';
import Menu from '../../public/icons/menu.svg';

function Header() {
  const router = useRouter();
  const { user, setCursorType } = useGlobalContext();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    const handler = () => {
      setIsNavOpen(false);
    };
    addEventListener('resize', handler);
    () => removeEventListener('resize', handler);
  }, []);
  return (
    <header
      className={styles.header}
      style={
        user && user.settings
          ? user.settings.cursorType === 'default'
            ? { cursor: 'auto' }
            : { cursor: 'none' }
          : { cursor: 'auto' }
      }
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div
        className={styles['open-sidebar-button']}
        onMouseEnter={() => setCursorType('pointer')}
        onMouseLeave={() => setCursorType('default')}
        onClick={() => setIsSidebarOpen(true)}
        style={
          user
            ? { pointerEvents: 'all', opacity: '100%' }
            : { pointerEvents: 'none', opacity: '0' }
        }
      >
        <Menu />
      </div>
      <h1
        className={styles['app-name']}
        style={user ? { left: '60px' } : { left: '20px' }}
      >
        Schooleo
      </h1>
      <UserMessage id="clearing-database">
        We are changing the data structure in the database, so all your data
        will be deleted.
      </UserMessage>
      <UserMessage id="custom-cursor-available">
        You can now enable the custom cursor in Settings.
      </UserMessage>
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
            onMouseEnter={() => setCursorType('pointer')}
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
              onMouseEnter={() => setCursorType('pointer')}
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
                onMouseEnter={() => setCursorType('pointer')}
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
                onMouseEnter={() => setCursorType('pointer')}
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
