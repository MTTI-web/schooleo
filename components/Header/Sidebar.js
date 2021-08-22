import styles from '../../styles/Sidebar.module.css';
import Settings from '../../public/icons/settings.svg';
import Close from '../../public/icons/close.svg';
import { useGlobalContext } from '../context';
import { useRouter } from 'next/router';

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const { setCursorType } = useGlobalContext();
  const router = useRouter();
  return (
    <aside
      className={styles.sidebar}
      style={isSidebarOpen ? { transform: 'translateX(0)' } : null}
    >
      <div className={styles['sidebar-header']}>
        <div
          className={styles['close-button']}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          onClick={() => setIsSidebarOpen(false)}
        >
          <Close />
        </div>
        <div className={styles['app-name']}>Schooleo</div>
        <div
          className={styles['settings-button']}
          onMouseEnter={() => setCursorType('pointer')}
          onMouseLeave={() => setCursorType('default')}
          onClick={() => {
            router.replace('/settings');
            setIsSidebarOpen(false);
          }}
        >
          <Settings />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
