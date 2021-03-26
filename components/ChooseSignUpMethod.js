import styles from '../styles/ChooseSignUpMethod.module.css';
import SectionHeading from './SectionHeading';

function ChooseSignUpMethod({ setUserType }) {
    const handleClick = (e) => {
        setUserType(e.currentTarget.textContent.toLowerCase());
    };
    return (
        <div className={styles['choose-sign-up-method-container']}>
            <SectionHeading>Choose Sign Up Method</SectionHeading>
            <div className={styles['sign-up-options']}>
                <button
                    type="button"
                    className={styles['sign-up-option']}
                    onClick={handleClick}
                >
                    Teacher
                </button>
                <button
                    type="button"
                    className={styles['sign-up-option']}
                    onClick={handleClick}
                >
                    Student
                </button>
            </div>
        </div>
    );
}

export default ChooseSignUpMethod;
