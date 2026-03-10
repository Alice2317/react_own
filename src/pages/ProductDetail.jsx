import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch,useSelector } from 'react-redux';
import { addCart, changeAdd } from '../stores/cartStore';
import { createAsyncMsg } from "../stores/toastStore";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.carts);
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams(); 


  const getProduct = async (id) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`);
      if (res.data.success) {
        setProduct(res.data.product);
      }
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    (() => {
      getProduct(id);
    })();
  }, [id])

  const addCartItem = async () => {
    let isMax = false;
    const index = state.carts.findIndex(
      (item) => item.product_id === product.id,
    );
    if(index !== -1){
      if (state.carts[index].qty>=product.num){
        isMax = true;
      };
    }
    if (isMax)return alert("已無庫存可購買");
    
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/cart`, {
        "data": {
          "product_id": product.id,
          "qty": count
        }
      });
      if(res.data.success){
        dispatch(addCart(res.data.data));
        dispatch(changeAdd(true));
        dispatch(createAsyncMsg({ success: true, id: new Date().getTime(), message :'成功加入購物車'}));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '請重新操作'+error }));
    }
  }
  
  return (
    <div className='container'>
      <div
        style={{
          minHeight: "400px",
          backgroundImage: `url(${product.imageUrl})`,
          backgroundPosition: "center center",
        }}
      ></div>
      <div className='row justify-content-between mt-4 mb-7'>
        <div className='col-md-7'>
          <h2 className='mb-0'>{product.title}</h2>
          <p className='fw-bold'>NT$ {product.price}</p>
          <p>{product.content}</p>
        </div>
        <div className='col-md-4'>
          <div className='input-group align-items-center w-100 mb-2'>
            <span className='pe-3'>數量:</span>
            <select
              className='form-select'
              defaultValue='1'
              onChange={(e) => {
                setCount(Number(e.target.value));
              }}
            >
              {Array.from({ length: product.num }, (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            className='btn btn-dark w-100 rounded-0 py-3'
            onClick={() => addCartItem()}
            disabled={isLoading}
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  );
}