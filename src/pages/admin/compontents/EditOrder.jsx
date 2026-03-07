import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const initData = {
  name:'',
  tel:'',
  email:'',
  address:'',
  message:'',
  is_paid:false,
}

export default function EditOrder({ eventHide, getOrders, tempOrder}) {
  const [isReady,setReady] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: initData
  });

  useEffect(() => {
    const updateReady= (boolean)=>{
      setReady(boolean)
    }
    if (tempOrder.id === undefined) return updateReady(false);
    reset({
      name: tempOrder.user.name,
      tel: tempOrder.user.tel,
      email: tempOrder.user.email,
      address: tempOrder.user.address,
      message: tempOrder.message ? tempOrder.message : '',
      is_paid: tempOrder.is_paid,
    });
    updateReady(true);
  }, [tempOrder, reset])
  
  

  const save = async (data) => {
    const request = {
      ...data,
      message: data.message,
      user:{
        name: data.name,
        tel: data.tel,
        email: data.email,
        address: data.address,
      },
      is_enabled: data.is_enabled ? 1 : 0,
      create_at: new Date().getTime() /1000,
    };
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/order/${tempOrder.id}`,{
        data:request
      });
      if (res.data.success) {
        eventHide();
        getOrders();
      }
    } catch (error) {
      alert('儲存優惠卷失敗',error);
    }
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <div className='modal fade' tabIndex='-1' id='editModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                編輯訂單
              </h1>
            </div>
            {isReady &&<div className='modal-body'>
              <div className='row'>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='title'>
                    * 姓名
                    <input
                      type='text'
                      className={`form-control ${errors.name && "is-invalid"}`}
                      {...register("name", {
                        required: {
                          value: true,
                          message: "姓名為必填",
                        },
                      })}
                    />
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='percent'>
                    電話
                    <div className="input-group mt-1">
                      <input
                        type='tel'
                        className={`form-control ${errors.tel && "is-invalid"}`}
                        {...register("tel", {
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
                        })}
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='date'>
                    EMAIL
                    <input
                      type='email'
                      className={`form-control mt-1 ${errors.email && "is-invalid"}`}
                      {...register("email", {
                        required: {
                          value: true,
                          message: "Email 為必填",
                        },
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email 格式不正確",
                        },
                      })}
                    />
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='code'>
                    地址
                    <input
                      type='text'
                      className={`form-control mt-1 ${errors.address && "is-invalid"}`}
                      {...register("address", {
                        required: {
                          value: true,
                          message: "地址為必填",
                        },
                      })}
                    />
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='code'>
                    留言
                    <textarea
                      className={`form-control ${errors.message && "is-invalid"}`}
                      {...register("message")}
                      id='message'
                      rows='3'
                    ></textarea>
                  </label>
                </div>
              </div>
              <label className='form-check-label' htmlFor='is_paid'>
                <input
                  type='checkbox'
                  className={`form-check-input me-2 ${errors.is_paid && "is-invalid"}`}
                  {...register("is_paid")}
                />
                是否已付款
              </label>
            </div>}
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                onClick={eventHide}
              >
                關閉
              </button>
              <button
                type='submit'
                className='btn btn-primary'
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

EditOrder.propTypes = {
  eventHide: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  tempOrder: PropTypes.object.isRequired,
};