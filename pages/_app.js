// _app.js
import '../styles/globals.css';
import '../styles/fps-erms.css';
import { UserProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>        
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;