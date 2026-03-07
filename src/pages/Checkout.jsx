import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { InputDom } from "../compontents/FormEelements";
import Loading from "../compontents/Loading";
import { clearCart, initFinal_total } from '../stores/cartStore';
import { createAsyncMsg } from "../stores/toastStore";


export default function Checkout() {
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = useState(false);
  const [coupon,setCoupon] = useState('');
  const state = useSelector((state) => state.carts);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const postCoupon = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/coupon`,
        {
          data: {
            code: coupon
          }
        }
      );
      
      if (res.data.success) {
        dispatch(initFinal_total(res.data.data.final_total));
        dispatch(createAsyncMsg({ success: res.data.success, id: new Date().getTime(), message: '已使用折扣' }));
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '折扣失敗' + error }));
    }
  };

  const pay = async (orderId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/pay/${orderId}`
      );
      if (res.data.success) {
        dispatch(clearCart());
        navigate(`/msg/${orderId}`, {
          state: {
            title: "付款",
            content:
              "您的訂單已付款成功，請耐心等待7-10天正在準備您的商品，感謝您的支持與愛護!",
          },
        });
      }
      setIsLoading(false)
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '付款失敗' + error }));
    }
  };

  const onSubmit = async (data) => {
    if (!data.agree) return;
    setIsLoading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/order`,
        {
          data: {
            user: {
              name: data.name,
              email: data.email,
              tel: data.tel,
              address: data.address,
            },
            message: data.message,
            pay: data.pay,
          },
        },
      );
      if (res.data.success) {
        pay(res.data.orderId);
      }else{
        setIsLoading(false)
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '請再重新操作' + error }));
      setIsLoading(false);
    }
  };

  return !state.isLoading ? (
    <div className='bg-light py-5'>
      {isLoading && <Loading title='付款中，請耐心等候..' />}
      <div className='container'>
        <div className='row justify-content-center flex-md-row flex-column-reverse'>
          <div className='col-md-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='bg-white p-4'>
                <h4 className='fw-bold'>填寫資料</h4>
                <div className='mb-2'>
                  <InputDom
                    register={register}
                    errors={errors}
                    id='name'
                    labelText='使用者名稱'
                    type='text'
                    rules={{
                      required: {
                        value: true,
                        message: "使用者名稱為必填",
                      },
                    }}
                  />
                </div>
                <div className='mb-2'>
                  <InputDom
                    register={register}
                    errors={errors}
                    id='email'
                    labelText='Email'
                    type='text'
                    rules={{
                      required: {
                        value: true,
                        message: "Email 為必填",
                      },
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email 格式不正確",
                      },
                    }}
                  />
                </div>
                <div className='mb-2'>
                  <InputDom
                    register={register}
                    errors={errors}
                    id='tel'
                    labelText='電話'
                    type='tel'
                    rules={{
                      required: {
                        value: true,
                        message: "電話為必填",
                      },
                      minLength: {
                        value: 8,
                        message: "電話不少於 8 碼",
                      },
                      maxLength: {
                        value: 10,
                        message: "電話不大於 10 碼",
                      },
                      pattern: {
                        value: /^09\d{8}$/,
                        message: "電話格式不正確",
                      },
                    }}
                  />
                </div>
                <div className='mb-2'>
                  <InputDom
                    register={register}
                    errors={errors}
                    id='address'
                    labelText='地點'
                    type='address'
                    rules={{
                      required: {
                        value: true,
                        message: "地點為必填",
                      },
                    }}
                  />
                </div>
                <div className='mb-2'>
                  <label htmlFor='message' className='form-label'>
                    備註
                  </label>
                  <textarea
                    className={`form-control ${errors.message && "is-invalid"}`}
                    {...register("message")}
                    id='message'
                    rows='3'
                  ></textarea>
                </div>
                <p className='mt-4 mb-2'>交易方式</p>
                <div className='form-check mb-2'>
                  <input
                    className={`form-check-input ${errors.pay && "is-invalid"}`}
                    {...register("pay", { required: true })}
                    type='radio'
                    name='pay'
                    id='pay1'
                    value='現金'
                  />
                  <label className='form-check-label text-muted' htmlFor='pay1'>
                    現金
                  </label>
                </div>
                <div className='form-check mb-2'>
                  <input
                    className={`form-check-input ${errors.pay && "is-invalid"}`}
                    {...register("pay", { required: true })}
                    type='radio'
                    name='pay'
                    id='pay2'
                    value='ATM'
                  />
                  <label className='form-check-label text-muted' htmlFor='pay2'>
                    ATM
                  </label>
                </div>
                <div className='form-check mb-2'>
                  <input
                    className={`form-check-input ${errors.pay && "is-invalid"}`}
                    {...register("pay", { required: true })}
                    type='radio'
                    name='pay'
                    id='pay3'
                    value='第三方支付'
                  />
                  <label className='form-check-label text-muted' htmlFor='pay3'>
                    第三方支付
                  </label>
                </div>
                {errors.pay && (
                  <div className='invalid-feedback'>請選擇交易方式</div>
                )}
                <br />
                <br />
                <div className='form-group form-check'>
                  <input
                    type='checkbox'
                    className={`form-check-input ${errors.agree && "is-invalid"}`}
                    {...register("agree", { required: true })}
                    id='agree'
                  />
                  <label className='form-check-label' htmlFor='agree'>
                    已看過購物條款
                  </label>
                </div>
              </div>
              <div className='d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100'>
                <Link to='/carts' className='text-dark mt-md-0 mt-3'>
                  <i className='fas fa-chevron-left me-2'></i>回購物車
                </Link>
                <button
                  type='submit'
                  className='btn btn-dark py-3 px-7 rounded-0'
                >
                  付款
                </button>
              </div>
            </form>
          </div>
          <div className='col-md-4'>
            <p className="mb-0">折扣碼</p>
            <div className='d-flex justify-content-between'>
              <input type="text" className="form-control" defaultValue={coupon} onBlur={(e)=>setCoupon(e.target.value)} />
              <button
                type='button'
                className='btn btn-primary text-nowrap ms-1'
                onClick={()=>postCoupon()}
              >
                送出
              </button>
            </div>
            <hr />
            <div className='border p-4 mb-4'>
              <h4 className='mb-4'>商品詳細</h4>
              {state.carts?.map((item) => (
                <div className='d-flex mt-2' key={item.id}>
                  <img
                    src={item.product.imageUrl}
                    className='me-2 w-160'
                  />
                  <div className='w-100'>
                    <div className='d-flex justify-content-between fw-bold'>
                      <p className='mb-0'>{item.product.title}</p>
                      <p className='mb-0'>x{item.qty}</p>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <p className='mb-0'>NT${item.product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h6 fw-bold'>小計</p>
                <p className='mb-0 h6 fw-bold'>
                  NT$
                  {state.total}
                </p>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h6 fw-bold'>折扣碼</p>
                <p className='mb-0 h6 fw-bold'>
                  NT$
                  {state.final_total - state.total}
                </p>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <p className='mb-0 h4 fw-bold'>總金額</p>
                <p className='mb-0 h4 fw-bold'>
                  NT$
                  {state.final_total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading title='正在載入資料中' />
  );
}
