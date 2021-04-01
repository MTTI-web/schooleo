import styles from '../../styles/Header.module.css';
import { FaBars, FaTimes } from 'react-icons/fa';

function OpenNav({ isNavOpen, setIsNavOpen }) {
    return (
        <div
            className={styles['open-nav-button']}
            onClick={() => setIsNavOpen(!isNavOpen)}
        >
            {!isNavOpen ? (
                <FaBars className={styles['open-nav-svg']} />
            ) : (
                <FaTimes className={styles['open-nav-svg']} />
            )}
        </div>
    );
}

export default OpenNav;
