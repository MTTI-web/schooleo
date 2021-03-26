import { useEffect, useState } from 'react';
import styles from '../styles/Cursor.module.css';
import { useGlobalContext } from './context';

function Cursor() {
    const [position, setPosition] = useState({});
    const { cursorType } = useGlobalContext();
    const [cursorStyles, setCursorStyles] = useState({});
    useEffect(() => {
        if (cursorType === 'pointer') {
            setCursorStyles({
                width: '15px',
                height: '15px',
                backgroundColor: '#ffffff50',
                boxShadow: '0 0 5px 3px #fff',
            });
        }
        if (cursorType === 'default') {
            setCursorStyles({
                width: '10px',
                height: '10px',
                backgroundColor: '#0dc7e6',
                boxShadow: '0 0 5px 3px #0da3bf50',
            });
        }
    }, [cursorType]);
    useEffect(() => {
        const handleMouseMove = (e) => {
            const position = { x: e.x, y: e.y };
            setPosition(position);
        };
        addEventListener('mousemove', handleMouseMove);
        return () => removeEventListener('mousemove', handleMouseMove);
    }, []);
    return (
        <div className={styles['cursor-background']}>
            <span
                className={styles.cursor}
                style={
                    Object.keys(position).length
                        ? { ...cursorStyles, left: position.x, top: position.y }
                        : null
                }
            ></span>
            <span
                className={styles['cursor-border']}
                style={
                    Object.keys(position).length
                        ? cursorType === 'pointer'
                            ? {
                                  left: position.x,
                                  top: position.y,
                                  width: '35px',
                                  height: '35px',
                                  borderWidth: '2px',
                                  borderColor: '#fff',
                              }
                            : {
                                  left: position.x,
                                  top: position.y,
                                  width: '25px',
                                  height: '25px',
                                  borderColor: '#0dc7e6',
                                  borderWidth: '1px',
                              }
                        : null
                }
            ></span>
        </div>
    );
}

export default Cursor;
