import { useGlobalContext } from './context';
import styles from '../styles/Classes.module.css';
import { useRouter } from 'next/router';

function NoClassesMessage() {
    const { setCursorType, user } = useGlobalContext();
    const router = useRouter();
    return (
        <div className={styles['no-classes-message']}>
            <h3>You have no classrooms right now.</h3>
            <button
                type="button"
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
                {user.userType === 'teacher' ? 'Create One' : 'Join One'}
            </button>
        </div>
    );
}

export default NoClassesMessage;
