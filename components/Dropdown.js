const { useState } = require('react');
import styles from '../styles/Dropdown.module.css';
import { useGlobalContext } from './context';

function Dropdown({ title, options, setOption, option }) {
    const [open, setOpen] = useState(false);
    const { setCursorType } = useGlobalContext();

    return (
        <div className={styles['dropdown-container']}>
            <div
                className={styles.title}
                onClick={() => setOpen(!open)}
                tabIndex={0}
                role="button"
                onFocus={(e) => {
                    e.currentTarget.style.outline = '1px solid #fefefe';
                }}
                onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                }}
                onMouseOver={() => setCursorType('pointer')}
                onMouseLeave={() => setCursorType('default')}
            >
                {title}: {option}
            </div>
            {open ? (
                <div className={styles.options}>
                    {options.map((currentOption, index) => (
                        <div
                            className={styles.option}
                            onClick={() => {
                                setOption(currentOption);
                                setOpen(false);
                            }}
                            key={index}
                            tabIndex={0}
                            onFocus={(e) => {
                                e.currentTarget.style.outline =
                                    '1px solid #fefefe';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.outline = 'none';
                            }}
                        >
                            {option === currentOption ? (
                                <div className={styles['option-selected-tick']}>
                                    ✔
                                </div>
                            ) : null}
                            {currentOption}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default Dropdown;
