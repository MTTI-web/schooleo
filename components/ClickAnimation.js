import { useEffect } from 'react';
import styles from '../styles/ClickAnimation.module.css';

function ClickAnimation() {
  const handleClick = (e) => {
    console.log(e);
    const animationContainer = document.querySelector('#animation-container');
    console.log(animationContainer);
    animationContainer.style.left = `${e.clientX}px`;
    animationContainer.style.top = `${e.clientY}px`;
    const newAnimation = document.createElement('div');
    newAnimation.classList.add('animation');
    newAnimation.addEventListener('animationend', (e) => {
      e.currentTarget.remove();
    });
    animationContainer.appendChild(newAnimation);
  };
  useEffect(() => {
    const background = document.querySelector('#background');
    background.addEventListener('click', handleClick);
    console.log('Click background:', background);
    return () => background.removeEventListener('click', handleClick);
  }, []);
  return (
    <div className={styles['background']} id="background">
      <div
        className={styles['animation-container']}
        id="animation-container"
      ></div>
    </div>
  );
}

export default ClickAnimation;
