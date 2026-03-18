import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';

const defaultData = {
  code: "",
  due_date: '',
  date: '',
  percent: "",
  is_enabled: 0,
  title: '',
};

export default function AddCoupon({ eventHide, getCoupons, action, tempCoupon, dateFormat }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: defaultData
  });

  useEffect(() => {
    if (action === 'edit') {
      reset({ ...tempCoupon, date: dateFormat(true, tempCoupon.due_date) })
    }else{
      reset(defaultData);
    }
  }, [action, tempCoupon,reset,dateFormat])

  const save = async (data) => {
    const request = {
      ...data,
      is_enabled: data.is_enabled ? 1 : 0,
      due_date: dateFormat(false, data.date),
    };
    try {
      const api_method = action === 'edit' ? 'put' : 'post';
      const api =
        action === 'edit' 
          ?`${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${tempCoupon.id}`
          : `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/coupon`;

      const res = await axios[api_method](api, { data: request });
      if (res.data.success) {
        reset(defaultData);
        eventHide();
        getCoupons();
      }
    } catch (error) {
      alert('儲存優惠卷失敗',error);
    }
  };

  return (
    <form onSubmit={handleSubmit(save)}>
      <div className='modal fade' tabIndex='-1' id='addModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                {action === "edit" ? "編輯" : "建立"}新優惠券
              </h1>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='title'>
                    * 標題
                    <input
                      type='text'
                      className={`form-control ${errors.title && "is-invalid"}`}
                      {...register("title", {
                        required: {
                          value: true,
                          message: "標題為必填",
                        },
                      })}
                    />
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='percent'>
                    折扣（%）
                    <div className="input-group mt-1">
                      <input
                        min="0"
                        type='number'
                        className={`form-control ${errors.percent && "is-invalid"}`}
                        {...register("percent", {
                          valueAsNumber: true,
                          required: {
                            value: true,
                            message: "折扣為必填",
                          },
                          min: {
                            value: 0,
                            message: '最小值為0',
                          }
                        })}
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='date'>
                    到期日
                    <input
                      type='date'
                      className={`form-control mt-1 ${errors.date && "is-invalid"}`}
                      {...register("date", {
                        required: {
                          value: true,
                          message: "到期日為必填",
                        },
                      })}
                    />
                  </label>
                </div>
                <div className='col-md-6 mb-2'>
                  <label className='w-100' htmlFor='code'>
                    優惠碼
                    <input
                      type='text'
                      className={`form-control mt-1 ${errors.code && "is-invalid"}`}
                      {...register("code", {
                        required: {
                          value: true,
                          message: "優惠碼為必填",
                        },
                      })}
                    />
                  </label>
                </div>
              </div>
              <label className='form-check-label' htmlFor='is_enabled'>
                <input
                  type='checkbox'
                  className={`form-check-input me-2 ${errors.is_enabled && "is-invalid"}`}
                  {...register("is_enabled")}
                />
                是否啟用
              </label>
            </div>
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

AddCoupon.propTypes = {
  eventHide: PropTypes.func.isRequired,
  dateFormat: PropTypes.func.isRequired,
  getCoupons: PropTypes.func.isRequired,
  tempCoupon: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
};