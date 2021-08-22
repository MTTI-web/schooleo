import styles from '../styles/FormSubmitButton.module.css';
import { useGlobalContext } from './context';

function FormSubmitButton({ children, disabled }) {
    const { setCursorType } = useGlobalContext();
    return (
        <button
            type="submit"
            className={styles['form-submit-button']}
            onMouseEnter={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default FormSubmitButton;
