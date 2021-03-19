import styles from '../../styles/FormSubmitButton.module.css';

function FormSubmitButton() {
    return (
        <button type="submit" className={styles['form-submit-button']}>
            Create Account
        </button>
    );
}

export default FormSubmitButton;
