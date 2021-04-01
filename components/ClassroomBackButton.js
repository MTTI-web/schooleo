import { useRouter } from 'next/router';
import styles from '../styles/ClassroomBackButton.module.css';
import { useGlobalContext } from './context';

function ClassroomBackButton() {
    const router = useRouter();
    const { setCursorType } = useGlobalContext();
    return (
        <div
            className={styles['back-button']}
            onClick={() => {
                router.replace('/classrooms');
                setCursorType('default');
            }}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
        >
            ←
        </div>
    );
}

export default ClassroomBackButton;
