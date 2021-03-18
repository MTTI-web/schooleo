import Head from 'next/head';
import AboutUsSection from '../components/AboutUsSection';
import { useGlobalContext } from '../components/context';
import styles from '../styles/Home.module.css';

export default function Home() {
    const { isSignedIn } = useGlobalContext();
    return (
        <section className={styles['homepage']}>
            <Head>
                <title>Schooleo</title>
            </Head>
            <div className={styles['landing-section']}>
                <div className={styles['app-hero']}>
                    <div className={styles['app-name']}>Schooleo</div>
                    <div className={styles['app-description']}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>
                </div>
            </div>
            <AboutUsSection />
        </section>
    );
}
