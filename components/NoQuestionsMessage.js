import { useGlobalContext } from './context';
import styles from '../styles/NoQuestionsMessage.module.css';
import { useRouter } from 'next/router';

function NoQuestionsMessage({ handleClick }) {
    const { setCursorType, user } = useGlobalContext();
    const router = useRouter();
    return (
        <div className={styles['no-questions-message']}>
            <h3>You have no questions in this assignment right now.</h3>
            <button
                type="button"
                onClick={() => {
                    handleClick();
                    setCursorType('default');
                }}
                onMouseEnter={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
            >
                Create Question
            </button>
        </div>
    );
}

export default NoQuestionsMessage;
