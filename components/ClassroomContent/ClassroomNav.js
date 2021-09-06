import styles from '../../styles/ClassroomContent.module.css';

const classroomNavs = ['stream', 'assignments', 'members'];

function ClassroomNav({ currentPage, setCurrentPage }) {
  return (
    <aside className={styles['classroom-page-nav-container']}>
      <nav className={styles['classroom-page-nav']}>
        {classroomNavs.map((nav) => (
          <div
            className={styles['classroom-page-nav-link']}
            style={
              currentPage === nav
                ? {
                    borderLeftColor: '#0ff',
                    borderLeftWidth: '2px',
                    backgroundColor: '#ffffff30',
                  }
                : {}
            }
            onClick={() => setCurrentPage(nav)}
          >
            {nav}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default ClassroomNav;
