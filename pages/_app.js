import ClickAnimation from '../components/ClickAnimation';
import { AppProvider } from '../components/context';
import Cursor from '../components/Cursor';
import Header from '../components/Header';
import WelcomeAnimation from '../components/WelcomeAnimation';
import InAppNotification from '../components/InAppNotification';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Cursor />
      <ClickAnimation />
      <WelcomeAnimation />
      <InAppNotification />
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default MyApp;
