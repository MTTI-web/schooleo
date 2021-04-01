import { useEffect, useState } from 'react';
import styles from '../styles/Cursor.module.css';
import { useGlobalContext } from './context';

function Cursor() {
    const [position, setPosition] = useState({});
    const { cursorType } = useGlobalContext();
    const [cursorStyles, setCursorStyles] = useState({});
    const [width, setWidth] = useState(1024);
    useEffect(() => {
        setWidth(innerWidth);
        const handler = () => {
            setWidth(innerWidth);
        };
        addEventListener('resize', handler);
        return () => removeEventListener('resize', handler);
    }, []);
    useEffect(() => {
        if (cursorType === 'pointer') {
            setCursorStyles({
                width: '15px',
                height: '15px',
                backgroundColor: '#ffffff50',
                boxShadow: '0 0 5px 3px #fff',
                opacity: '0',
            });
        }
        if (cursorType === 'default') {
            setCursorStyles({
                width: '10px',
                height: '10px',
                backgroundColor: '#0dc7e6',
                boxShadow: '0 0 5px 3px #0da3bf50',
                opacity: '100%',
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
        width > 680 && (
            <div className={styles['cursor-background']}>
                <span
                    className={styles.cursor}
                    style={
                        Object.keys(position).length
                            ? {
                                  ...cursorStyles,
                                  left: position.x,
                                  top: position.y,
                              }
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
                                      width: '30px',
                                      height: '30px',
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
                <span
                    className={styles['cursor-inner-pointer']}
                    style={
                        cursorType === 'pointer'
                            ? {
                                  width: '3px',
                                  height: '3px',
                                  left: position.x,
                                  top: position.y,
                                  boxShadow: '0 0 10px 4px #fff',
                              }
                            : {
                                  width: '0',
                                  height: '0',
                                  left: position.x,
                                  top: position.y,
                              }
                    }
                ></span>
            </div>
        )
    );
}

export default Cursor;
