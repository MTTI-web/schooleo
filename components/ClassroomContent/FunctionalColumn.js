import styles from '../../styles/FunctionalColumn.module.css';

function FunctionalColumn({ isColumnOpen }) {
    return (
        <div
            className={styles['functional-column']}
            style={
                isColumnOpen
                    ? { opacity: '100%', pointerEvents: 'all' }
                    : { opacity: 0, pointerEvents: 'none' }
            }
        >
            Functional Column
        </div>
    );
}

export default FunctionalColumn;
