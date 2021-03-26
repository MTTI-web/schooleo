import styles from '../styles/FormSubmitButton.module.css';
import { useGlobalContext } from './context';

function FormSubmitButton({ children }) {
    const { setCursorType } = useGlobalContext();
    return (
        <button
            type="submit"
            className={styles['form-submit-button']}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
        >
            {children}
        </button>
    );
}

export default FormSubmitButton;
