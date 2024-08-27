import '@/styles/globals.css';
import Navbar from '../components/layout/navbar';
import Sidebar from '../components/layout/sidebar';

export default function App({ Component, pageProps }) {
  return (
    <Navbar>
      <Component {...pageProps} />;
    </Navbar>
  );
}
