import styles from '../styles/FormLabel.module.css';
import { useState } from 'react';
import { useGlobalContext } from './context';

function FormLabel({ type, children, id, initialValue = '', style = {} }) {
    const [active, setActive] = useState(false);
    const [currentInput, setCurrentInput] = useState(initialValue);
    const { setCursorType } = useGlobalContext();
    return (
        <label
            htmlFor={id}
            className={styles['login-form-label']}
            onMouseOver={() => setCursorType('pointer')}
            onMouseLeave={() => setCursorType('default')}
            style={style}
        >
            <div
                className={styles['field-name']}
                style={
                    active || currentInput
                        ? {
                              fontSize: '80%',
                              top: '0px',
                              left: '7px',
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
                              borderColor: '#79e2f2',
                          }
                        : null
                }
            />
        </label>
    );
}

export default FormLabel;
