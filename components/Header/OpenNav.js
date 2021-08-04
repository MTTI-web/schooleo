import styles from '../../styles/Header.module.css';
import Close from '../../public/icons/close.svg';
import Menu from '../../public/icons/menu.svg';

function OpenNav({ isNavOpen, setIsNavOpen }) {
  return (
    <div
      className={styles['open-nav-button']}
      onClick={() => setIsNavOpen(!isNavOpen)}
    >
      <div className={styles['buttons-container']}>
        {!isNavOpen ? (
          <Menu className={styles['open-nav-svg']} />
        ) : (
          <Close className={styles['open-nav-svg']} />
        )}
      </div>
    </div>
  );
}

export default OpenNav;
