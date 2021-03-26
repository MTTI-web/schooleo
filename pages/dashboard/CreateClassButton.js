import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import styles from '../../styles/CreateClassButton.module.css';

function CreateClassButton() {
    const router = useRouter();
    const { setCursorType } = useGlobalContext();
    return (
        <button
            type="button"
            className={styles['create-class-button']}
            title="Create Class"
            onClick={() => router.replace('/create_class')}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
        >
            +
        </button>
    );
}

export default CreateClassButton;
