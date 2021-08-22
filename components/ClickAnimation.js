import { useEffect } from 'react';
import styles from '../styles/ClickAnimation.module.css';
import { useGlobalContext } from './context';

function ClickAnimation() {
  const { log } = useGlobalContext();
  const handleClick = (e) => {
    log(e);
    const animationContainer = document.querySelector('#animation-container');
    log(animationContainer);
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
    document.body.addEventListener('click', handleClick);
    log('Click background:', background);
    return () => document.body.removeEventListener('click', handleClick);
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
