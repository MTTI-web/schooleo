import styles from '../../styles/ClassroomContent.module.css';
import ClassroomStream from './ClassroomStream';
import FunctionalColumn from './FunctionalColumn';

function ClassroomContent({ classroom }) {
    return (
        <div className={styles['classroom-content']}>
            <FunctionalColumn />
            <ClassroomStream classroom={classroom} />
        </div>
    );
}

export default ClassroomContent;
