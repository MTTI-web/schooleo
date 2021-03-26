import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';

function ClassroomContent() {
    return (
        <div className={styles['classroom-content']}>
            <FunctionalColumn />
            <ClassroomStream />
        </div>
    );
}

export default ClassroomContent;
