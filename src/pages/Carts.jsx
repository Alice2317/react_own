import axios from "axios";
import { Link } from "react-router";
import Loading from "../compontents/Loading";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeCart, addCart, clearCart, initCarts, initFinal_total, initTotal } from '../stores/cartStore';
import { createAsyncMsg } from "../stores/toastStore";

const updateAxios = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
}

export default function Carts() {
  const dispatch = useDispatch();
  const [isAuth, setisAuth] = useState(false);
  const state = useSelector((state) => state.carts);
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
      if (res.data.success) {
        dispatch(initCarts(res.data.data.carts));
        dispatch(initFinal_total(res.data.data.final_total));
        dispatch(initTotal(res.data.data.total));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '取得購物車失敗' + error }));
    }
  }, [dispatch])

  useEffect(() => {
    if (state.isAdd){
      initCart();
    }
  }, [initCart,state.isAdd]);

  useEffect(() => {
    if (!token) return;
    const update = ()=>{
      setisAuth(true);
      updateAxios(token);
    }
    update();
  }, [token]);

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`,
      );
      if (res.data.success) {
        dispatch(removeCart(id));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '刪除產品失敗'+error }));
    }
  };

  const updateCartItem = async (id, num) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`,
        {
          data: {
            product_id: id,
            qty: num,
          },
        },
      );
      if (res.data.success) {
        dispatch(addCart(res.data.data));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '更新產品失敗'+error }));
    }
  };

  const clearCarts = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/carts`,
      );
      if (res.data.success) {
        dispatch(clearCart());
        dispatch(createAsyncMsg({ success: true, id: new Date().getTime(), message: '已清空購物車' }));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '請重新操作'+error }));
    }
  };

  return !state.isLoading ? (
    state.carts.length === 0 ? (
      <div className='d-flex justify-content-center'>
        <div className='mx-auto'>
          <div className='d-flex justify-content-between'>
            <h2 className='mt-2'>購物車</h2>
          </div>
          請選擇商品
        </div>
      </div>
    ) : (
      <div className='container py-5'>
        <div className='mx-auto cartWrapper'>
          <div className='d-flex justify-content-between'>
            <h2>購物車</h2>
          </div>
          {state?.carts?.map((item) => (
            <div
              className='d-flex mt-4 bg-light'
              key={item.id}
            >
              <img
                src={item.product.imageUrl}
                alt='主圖'
                className="w-160"
              />
              <div className='p-3 w-100'>
                <div className="d-flex justify-content-between">
                  <p className='mb-0 fw-bold'>{item.product.title}</p>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => removeCartItem(item.id)}
                  ></button>
                </div>
                <br />
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='input-group w-50'>
                    <select
                      className='form-select'
                      defaultValue={item.qty}
                      onChange={(e) => {
                        updateCartItem(item.id, Number(e.target.value));
                      }}
                    >
                      {Array.from({ length: item.product.num }, (_, i) => (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className='mb-0 ms-auto'>NT${item.product.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className='d-flex justify-content-between mt-4'>
            <p className='mb-0 h4 fw-bold'>總金額</p>
            <p className='mb-0 h4 fw-bold'>
              NT$
                {state?.total}
            </p>
          </div>
          <div className="row row-cols-2 g-0 mt-3">
            <div className="col">
              <button
                type='button'
                className='btn btn-danger rounded-0 w-100'
                onClick={() => clearCarts()}
              >
                清空購物車
              </button>
            </div>
            <div className="col">
              {!isAuth ? (
                <Link to='/login'>
                  <button
                    type='button'
                    className='btn btn-dark rounded-0 w-100'
                  >
                    請先登入後結帳
                  </button>
                </Link>
              ) : (
                <Link
                  to='/checkout'
                  className='btn btn-dark rounded-0 w-100'
                >
                  確認購物車
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Loading title='正在載入資料中' />
  );
}
