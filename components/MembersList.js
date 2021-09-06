import styles from '../styles/MembersList.module.css';

function MembersList({ students, style = {} }) {
  return (
    <div className={styles['members-list-container']} style={style}>
      <div className={styles['members-list-heading']}>Members</div>
      <ol className={styles['members-list']}>
        {students.map(({ name }, index) => (
          <li className={styles['member']} key={index}>
            {name}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default MembersList;
