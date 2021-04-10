import { useGlobalContext } from './context';
import styles from '../styles/ShowMembersButton.module.css';

function ShowMembersButton({ setShowMembers, setShowClassroomDetails }) {
    const { setCursorType } = useGlobalContext();
    return (
        <button
            type="button"
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            onClick={() => {
                setShowMembers(true);
                setShowClassroomDetails(false);
            }}
            className={styles['show-members-button']}
        >
            Show Members
        </button>
    );
}

export default ShowMembersButton;
