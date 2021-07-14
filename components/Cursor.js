import { useEffect, useState } from 'react';
import styles from '../styles/Cursor.module.css';
import { useGlobalContext } from './context';

function Cursor() {
  const { userCursorType, cursorType } = useGlobalContext();
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
        backgroundColor: '#ffffff50',
        boxShadow: '0 0 5px 3px #fff',
        opacity: '0',
      });
    }
    if (cursorType === 'default') {
      setCursorStyles({
        backgroundColor: '#0dc7e6',
        boxShadow: '0 0 5px 3px #0da3bf50',
        opacity: '100%',
      });
    }
  }, [cursorType]);
  useEffect(() => {
    if (userCursorType !== 'default') {
      const handleMouseMove = (e) => {
        const cursor = document.querySelector('#cursor');
        const cursorBorder = document.querySelector('#cursor-border');
        const cursorInnerPointer = document.querySelector(
          '#cursor-inner-pointer'
        );
        const position = { x: e.pageX, y: e.pageY };
        cursor.style.left = `${position.x}px`;
        cursor.style.top = `${position.y}px`;
        //   cursor.style.boxShadow = `0 0 ${(e.movementX + e.movementY) / 4}px ${
        //     (e.movementX + e.movementY) / 4
        //   }px #fff`;
        cursorBorder.style.left = `${position.x}px`;
        cursorBorder.style.top = `${position.y}px`;
        cursorInnerPointer.style.left = `${position.x}px`;
        cursorInnerPointer.style.top = `${position.y}px`;
      };
      addEventListener('mousemove', handleMouseMove);
      return () => removeEventListener('mousemove', handleMouseMove);
    } else {
      return;
    }
  }, []);
  return (
    userCursorType !== 'default' &&
    width > 680 && (
      <div className={styles['cursor-background']}>
        <div
          className={styles.cursor}
          id="cursor"
          style={{
            ...cursorStyles,
          }}
        ></div>
        <span
          className={styles['cursor-border']}
          id="cursor-border"
          style={
            cursorType === 'pointer'
              ? {
                  width: '32px',
                  height: '32px',
                  borderWidth: '3px',
                  borderColor: '#fff',
                }
              : {
                  width: '30px',
                  height: '30px',
                  borderColor: '#0dc7e6',
                  borderWidth: '2.5px',
                }
          }
        ></span>
        <span
          className={styles['cursor-inner-pointer']}
          id="cursor-inner-pointer"
          style={
            cursorType === 'pointer'
              ? {
                  width: '3px',
                  height: '3px',
                  boxShadow: '0 0 10px 4px #fff',
                }
              : {
                  width: '0',
                  height: '0',
                }
          }
        ></span>
      </div>
    )
  );
}

export default Cursor;
