import Head from 'next/head';
import styles from '../../styles/Classrooms.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import Classes from './Classes';
import CreateClassButton from './CreateClassButton';
import { useState } from 'react';

function Dashboard() {
    const { user } = useGlobalContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);
    return (
        <section
            className={styles['dashboard']}
            style={
                loading
                    ? {
                          justifyContent: 'center',
                      }
                    : {
                          justifyContent: 'normal',
                      }
            }
        >
            <Head>
                <title>Dashboard</title>
            </Head>
            <h1 className={styles['section-heading']}>Classrooms</h1>
            <Classes loading={loading} setLoading={setLoading} />
            <CreateClassButton />
        </section>
    );
}

export default Dashboard;
