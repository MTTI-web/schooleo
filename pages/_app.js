import { AppProvider } from '../components/context';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AppProvider>
            <Header />
            <Component {...pageProps} />
        </AppProvider>
    );
}

export default MyApp;
