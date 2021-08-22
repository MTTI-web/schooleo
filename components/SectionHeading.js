import styles from '../styles/SectionHeading.module.css';

function SectionHeading(props) {
  return (
    <div className={styles['section-heading']} {...props}>
      <div className={styles['section-heading-text']}>{props.children}</div>
      <div className={styles['section-heading-underline']}></div>
    </div>
  );
}

export default SectionHeading;
