import styles from '../styles/FormLabel.module.css';
import { useState } from 'react';
import { useGlobalContext } from './context';

function FormLabel({
  type,
  children,
  id,
  initialValue = '',
  style = {},
  inputStyle = {},
  labelStyle = {},
  onInput = null,
}) {
  const [active, setActive] = useState(false);
  const [currentInput, setCurrentInput] = useState(initialValue);
  const { setCursorType } = useGlobalContext();
  return (
    <label
      htmlFor={id}
      className={styles['login-form-label']}
      onMouseEnter={() => setCursorType('pointer')}
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
                ...labelStyle,
              }
            : labelStyle
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
        onInput={(e) => {
          setCurrentInput(e.currentTarget.value);
          if (onInput) onInput(e);
        }}
        autoComplete="off"
        required
        style={
          active || currentInput
            ? {
                borderColor: '#79e2f2',
                ...inputStyle,
              }
            : inputStyle
        }
      />
    </label>
  );
}

export default FormLabel;
