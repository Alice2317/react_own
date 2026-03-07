import { Provider } from 'react-redux';
import { Outlet } from "react-router";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import store from './store';
import { Toast } from "./compontents/Toast";

export default function App() {

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
