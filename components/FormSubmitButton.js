import styles from '../styles/FormSubmitButton.module.css';

function FormSubmitButton({ children }) {
    return (
        <button type="submit" className={styles['form-submit-button']}>
            {children}
        </button>
    );
}

export default FormSubmitButton;
