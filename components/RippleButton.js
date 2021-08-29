import styles from '../styles/RippleButton.module.css';
import { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from './context';

const RippleButton = ({ children, style, onClick = null, disabled }) => {
  const [clicked, setClicked] = useState(false);
  const ripple = useRef(null);
  const { setCursorType } = useGlobalContext();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (clicked) {
        ripple.current.classList.remove(styles['show-ripple']);
        // ripple.current.style.animation = '';
        setClicked(false);
      }
    }, 250);
    return () => clearTimeout(timeout);
  }, [clicked]);
  return (
    <button
      className={styles['button']}
      disabled={disabled}
      onMouseEnter={() => setCursorType('pointer')}
      onMouseLeave={() => setCursorType('default')}
      onClick={(e) => {
        if (onClick) onClick();
        const elPos = e.currentTarget.getBoundingClientRect();
        const x = e.pageX - elPos.left;
        const y = e.pageY - elPos.top;
        console.log(`x: ${x}, y: ${y}`);
        ripple.current.style = `top: ${y}px; left: ${x}px;`;
        ripple.current.classList.add(styles['show-ripple']);
        setClicked(true);
      }}
      style={style}
    >
      <span
        className={styles['ripple']}
        ref={ripple}
        // style={{
        //   width: clicked ? '50px' : '0',
        //   height: clicked ? '50px' : '0',
        // }}
      ></span>
      {children}
    </button>
  );
};

export default RippleButton;
