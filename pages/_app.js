import { AppProvider } from '../components/context';
import Header from '../components/Header';
import WelcomeAnimation from '../components/WelcomeAnimation';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <WelcomeAnimation />
            <Header />
            <Component {...pageProps} />
        </AppProvider>
    );
}

export default MyApp;
