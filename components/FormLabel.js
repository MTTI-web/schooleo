import styles from '../styles/FormLabel.module.css';
import { useState } from 'react';

function FormLabel({ type, children, id }) {
    const [active, setActive] = useState(false);
    const [currentInput, setCurrentInput] = useState('');
    return (
        <label htmlFor={id} className={styles['login-form-label']}>
            <div
                className={styles['field-name']}
                style={
                    active || currentInput
                        ? {
                              fontSize: '80%',
                              top: '-5px',
                              left: '3px',
                              color: '#79e2f2',
                          }
                        : null
                }
            >
                {children}
            </div>
            <input
                type={type}
                name={id}
                id={id}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                value={currentInput}
                onInput={(e) => setCurrentInput(e.currentTarget.value)}
                autoComplete="off"
                required
                style={
                    active || currentInput
                        ? {
                              borderBottomColor: '#79e2f2',
                          }
                        : null
                }
            />
        </label>
    );
}

export default FormLabel;
