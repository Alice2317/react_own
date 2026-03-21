import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useEffect, useState,useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initCarts,initFinal_total,initTotal } from "../stores/cartStore";
import { createAsyncMsg } from "../stores/toastStore";

const updateAxios = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
}

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.carts);
  const [isAuth, setisAuth] = useState(false);
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
  if (token) {
    updateAxios(token);
  }

  const initCart = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart`,
      );
      if (res.data.success){
        dispatch(initCarts(res.data.data.carts));
        dispatch(initFinal_total(res.data.data.final_total));
        dispatch(initTotal(res.data.data.total));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '取得購物車失敗' + error }));
    }
  }, [dispatch])

  useEffect(() => {
    initCart();
  }, [initCart]);

  useEffect(() => {
    const updateAuth =(boolean)=>{
      setisAuth(boolean)
    }
    if (!token) return updateAuth(false);
    updateAuth(true);
  }, [token]);


  const logout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/v2/logout`,
      );
      if (res.data.success) {
        const date = new Date(); //目前時間
        date.setMinutes(date.getMinutes() - 480).toLocaleString();
        document.cookie = `token=; expires=${date}`;
      }
      setisAuth(false);
      navigate("/");
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '登出失敗' + error }));
    }
  };

  return (
    <div className='bg-white sticky-top border-bottom'>
      <div className='container'>
        <nav className='navbar px-0 navbar-expand-lg navbar-light'>
          <Link
            className='navbar-brand position-absolute'
            index='true'
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "50%",
            }}
          >
            OWN
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div
            className='collapse navbar-collapse custom-header-md-open'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  aria-current='page'
                  to='/products'
                >
                  Products
                </Link>
              </li>
              <li className='d-block d-lg-none nav-item'>
                <Link className='nav-link' to='/carts'>
                  Carts
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/faq'>
                  Faq
                </Link>
              </li>
            </ul>
          </div>
          <div className='d-flex'>
            {!isAuth ? (
              <Link className='btn' to='/login'>
                <i className="bi bi-person-circle"></i>
              </Link>
            ) : (
              <button
                type='button'
                className='btn'
                onClick={() => logout()}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            )}
            <Link
              className='btn position-relative border-0 text-center'
              to='/carts'
            >
              <i className='bi bi-bag-fill'></i>
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {state.carts.length > 0 &&
                  state.carts.reduce((a, b) => {
                    a += b.qty;
                    return a;
                  }, 0)}
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
