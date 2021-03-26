import { useRouter } from 'next/router';
import styles from '../../styles/CreateClassButton.module.css';

function CreateClassButton() {
    const router = useRouter();
    return (
        <button
            type="button"
            className={styles['create-class-button']}
            title="Create Class"
            onClick={() => router.replace('/create_class')}
        >
            +
        </button>
    );
}

export default CreateClassButton;
