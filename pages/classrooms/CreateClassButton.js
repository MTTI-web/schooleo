import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import styles from '../../styles/CreateClassButton.module.css';

function CreateClassButton() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const { setCursorType } = useGlobalContext();
    return user ? (
        <button
            type="button"
            className={styles['create-class-button']}
            title={user.userType === 'teacher' ? 'Create Class' : 'Join Class'}
            onClick={() => {
                router.replace(
                    user.userType === 'teacher'
                        ? '/create_classroom'
                        : '/join_classroom'
                );
                setCursorType('default');
            }}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
        >
            +
        </button>
    ) : null;
}

export default CreateClassButton;
