import Members from '../public/icons/members.svg';
import styles from '../styles/OpenMembersListButton.module.css';
import { useGlobalContext } from './context';

function OpenMembersListButton({ setShowMembers, showMembers }) {
  const { setCursorType } = useGlobalContext();
  return (
    <div
      className={styles['show-members-button']}
      onClick={() => {
        setShowMembers(!showMembers);
      }}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
    >
      <Members />
    </div>
  );
}

export default OpenMembersListButton;
