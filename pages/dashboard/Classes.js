import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import styles from '../../styles/Classes.module.css';

function Classes() {
    const { user, setCursorType } = useGlobalContext();
    const router = useRouter();
    return user ? (
        <div className={styles['class-list-section']}>
            <h2 className={styles['class-section-heading']}>Classrooms</h2>
            {user && user.classrooms.length ? (
                <div className={styles.classList}>
                    {user.classrooms.map((classItem, index) => (
                        <div
                            className={styles.class}
                            key={index}
                            onClick={() =>
                                router.replace(
                                    `/classroom/${classItem.creationTime}`
                                )
                            }
                            onMouseOver={() => setCursorType('pointer')}
                            onMouseLeave={() => setCursorType('default')}
                        >
                            <div className={styles['class-name']}>
                                {classItem.name}
                            </div>
                            <div className={styles['class-details']}>
                                <div className={styles['class-subject']}>
                                    <div className={styles['detail-title']}>
                                        Subject:
                                    </div>
                                    {classItem.subject}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles['no-classes-message']}>
                    <h3>You have no classes right now.</h3>
                    <button
                        type="button"
                        onClick={() => router.replace('/create_class')}
                    >
                        Create One
                    </button>
                </div>
            )}
        </div>
    ) : null;
}

export default Classes;
