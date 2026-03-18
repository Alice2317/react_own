import { Provider } from 'react-redux';
import { useEffect } from "react";
import { Outlet,useLocation } from "react-router";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import store from './store';
import { Toast } from "./compontents/Toast";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Provider store={store}>
      <div className='App'>
        <Header />
        <Toast />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
