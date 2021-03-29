import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGlobalContext } from '../components/context';
import SignOutButton from '../components/SignOutButton';
import styles from '../styles/UserInfo.module.css';

function UserInfo() {
    const { user } = useGlobalContext();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, []);
    return (
        <section className={styles['user-info-section']}>
            <SignOutButton />
            <div className={styles['section-heading']}>User Info</div>
            {user && (
                <div className={styles['user-info-content']}>
                    <div className={styles['user-info-detail']}>
                        <div className={styles['user-info-detail-title']}>
                            Account Type
                        </div>
                        <div className={styles['user-info-detail-content']}>
                            {user.userType}
                        </div>
                    </div>
                    <div className={styles['user-info-detail']}>
                        <div className={styles['user-info-detail-title']}>
                            Username
                        </div>
                        <div className={styles['user-info-detail-content']}>
                            {user.username}
                        </div>
                    </div>
                    <div className={styles['user-info-detail']}>
                        <div className={styles['user-info-detail-title']}>
                            Email
                        </div>
                        <div className={styles['user-info-detail-content']}>
                            {user.email}
                        </div>
                    </div>
                    <div className={styles['user-info-detail']}>
                        <div className={styles['user-info-detail-title']}>
                            Nationality
                        </div>
                        <div className={styles['user-info-detail-content']}>
                            {user.nationality}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default UserInfo;
