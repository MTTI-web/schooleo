import styles from '../styles/ChooseSignUpMethod.module.css';
import { useGlobalContext } from './context';
import SectionHeading from './SectionHeading';

function ChooseSignUpMethod({ setUserType }) {
    const { setCursorType } = useGlobalContext();
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
                    onMouseOver={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                >
                    Teacher
                </button>
                <button
                    type="button"
                    className={styles['sign-up-option']}
                    onClick={handleClick}
                    onMouseOver={() => setCursorType('pointer')}
                    onMouseLeave={() => setCursorType('default')}
                >
                    Student
                </button>
            </div>
        </div>
    );
}

export default ChooseSignUpMethod;
