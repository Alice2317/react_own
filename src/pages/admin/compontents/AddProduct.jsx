import axios from "axios";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import PropTypes from 'prop-types';

const defaultData = {
  category: "",
  content: "",
  description: "",
  is_enabled: 0,
  origin_price: 0,
  price: 0,
  title: "",
  unit: "",
  imageUrl: "",
  imagesUrl: [],
};

export default function AddProduct({ eventHide, getProducts, action, tempProduct }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: defaultData,
  });

  const watchImageUrl = useWatch({
    control,
    name: "imageUrl",
    defaultValue: defaultData.imageUrl
  });

  useEffect(() => {
    if (action === 'edit') {
      reset(tempProduct)
    }else{
      reset(defaultData);
    }
  }, [action, tempProduct,reset])
  
  const save = async (data) => {
    const request = {
      ...data,
      is_enabled: data.is_enabled ? 1 : 0,
    };
    try {
      const api_method = action === 'edit' ? 'put' : 'post';
      const api =
        action === "edit"
          ? `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/product/${tempProduct.id}`
          : `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/product`;

      const res = await axios[api_method](api, { data: request });
      if (res.data.success) {
        reset(defaultData);
        eventHide();
        getProducts();
      }
    } catch (error) {
      alert('儲存產品失敗'+error)
    }
  };
  
  const uploadFile =async (e)=>{
    const files = e.target.files;
    if(files.length === 0)return;
    let formData = new FormData();
    formData.append('file-to-upload',files.item(0));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/upload`,
        formData,
      );
      if (res.data.success) {
        setValue('imageUrl', res.data.imageUrl);
      }
    } catch (error) {
      alert('上傳檔案失敗'+error)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(save)}>
      <div className='modal fade' tabIndex='-1' id='addModal'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                {action === "edit" ? "編輯" : "建立"}商品
              </h1>
            </div>
            <div className='modal-body'>
              <div className='row'>
                <div className='col-sm-4'>
                  * 圖片
                  <img
                    src={watchImageUrl}
                    className={watchImageUrl ? 'card-img-top primary-image' : 'd-none'}
                    alt='主圖'
                  />
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='image'>
                      <input
                        type='text'
                        placeholder="輸入圖片網址"
                        className={`form-control ${errors.imageUrl && "is-invalid"}`}
                        {...register("imageUrl", {
                          required: {
                            value: true,
                            message: "圖片連結為必填",
                          }
                        })}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='customFile'>
                      或 上傳圖片
                      <input
                        type='file'
                        id='customFile'
                        name='file-to-upload'
                        className='form-control'
                        onChange={(e) => uploadFile(e)}
                      />
                    </label>
                  </div>
                  
                </div>
                <div className='col-sm-8'>
                  <div className='form-group mb-2'>
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
                  <div className='row'>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='category'>
                        * 分類
                        <input
                          type='text'
                          className={`form-control ${errors.category && "is-invalid"}`}
                          {...register("category", {
                            required: {
                              value: true,
                              message: "分類為必填",
                            },
                          })}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='unit'>
                        * 單位
                        <input
                          type='text'
                          className={`form-control ${errors.unit && "is-invalid"}`}
                          {...register("unit", {
                            required: {
                              value: true,
                              message: "單位為必填",
                            },
                          })}
                        />
                      </label>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='origin_price'>
                        * 原價
                        <input
                          type='number'
                          className={`form-control ${errors.origin_price && "is-invalid"}`}
                          {...register("origin_price", {
                            valueAsNumber: true,
                            required: {
                              value: true,
                              message: "原價為必填",
                            },
                            min: {
                              value: 0,
                              message: '最小值為0',
                            }
                          })}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2 col-md-6'>
                      <label className='w-100' htmlFor='price'>
                        * 售價
                        <input
                          type='number'
                          className={`form-control ${errors.price && "is-invalid"}`}
                          {...register("price", {
                            valueAsNumber: true,
                            required: {
                              value: true,
                              message: "售價為必填",
                            },
                            min: {
                              value: 0,
                              message: '最小值為0',
                            }
                          })}
                        />
                      </label>
                    </div>
                  </div>
                  <hr />
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='description'>
                      * 產品描述
                      <textarea
                        type='text'
                        className={`form-control ${errors.description && "is-invalid"}`}
                        {...register("description", {
                          required: {
                            value: true,
                            message: "產品描述為必填",
                          },
                        })}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='content'>
                      * 說明內容
                      <textarea
                        type='text'
                        className={`form-control ${errors.content && "is-invalid"}`}
                        {...register("content", {
                          required: {
                            value: true,
                            message: "產品說明內容為必填",
                          },
                        })}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2'>
                    <div className='form-check'>
                      <label
                        className='w-100 form-check-label text-start'
                        htmlFor='is_enabled'
                      >
                        是否啟用
                        <input
                          type='checkbox'
                          className={`form-check-input ${errors.is_enabled && "is-invalid"}`}
                          {...register("is_enabled")}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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

AddProduct.propTypes = {
  eventHide: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  tempProduct: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
};