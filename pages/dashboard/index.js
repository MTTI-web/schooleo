import Head from 'next/head';
import styles from '../../styles/Dashboard.module.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../components/context';
import SectionHeading from '../../components/SectionHeading';
import Classes from './Classes';
import CreateClassButton from './CreateClassButton';

function Dashboard() {
    const { user } = useGlobalContext();
    const router = useRouter();
    useEffect(() => {
        if (!user) {
            router.replace('/');
        }
    }, [user]);
    return (
        <section className={styles['dashboard']}>
            <Head>
                <title>Dashboard</title>
            </Head>
            <h1 className={styles['section-heading']}>Dashboard</h1>
            <Classes />
            <CreateClassButton />
        </section>
    );
}

export default Dashboard;
