import styles from '../../styles/FunctionalColumn.module.css';
import { useState, useEffect } from 'react';

function FunctionalColumn({ isColumnOpen }) {
    const [width, setWidth] = useState(1024);
    useEffect(() => {
        setWidth(innerWidth);
        const handler = () => {
            setWidth(innerWidth);
        };
        addEventListener('resize', handler);
        return () => removeEventListener('resize', handler);
    }, []);
    return (
        <div
            className={styles['functional-column']}
            style={
                width <= 730 && !isColumnOpen
                    ? { opacity: 0, pointerEvents: 'none' }
                    : { opacity: '100%', pointerEvents: 'all' }
            }
        >
            Functional Column
        </div>
    );
}

export default FunctionalColumn;
