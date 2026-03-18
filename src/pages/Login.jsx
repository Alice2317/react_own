import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useEffect, useCallback, useState } from "react";
import { useDispatch } from 'react-redux';
import { InputDom } from "../compontents/FormEelements";
import { createAsyncMsg } from "../stores/toastStore";
import Loading from "../compontents/Loading";

const updateCookie = (token,expired)=>{
  document.cookie = `token=${token};expired:${new Date(expired)}`;
}

const getCookie = (name) => {
  const rgx = new RegExp(`(?:(?:^|.*;\\s*)${name}\\s*=\\s*([^;]*).*$)|^.*$`);

  return document.cookie.replace(rgx, '$1');
};

const updateAxios = (token)=>{
  axios.defaults.headers.common["Authorization"] = token;
}

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAdminLoading,setAdminLoading] = useState(true);
  const [isCheck,setCheck] = useState(false);
  const { state } = location;
  const isAdmin = state.key === 'admin';
  
  const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onTouched",
    });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/v2/admin/signin`, {
        username: data.email,
        password: data.password,
      });
      const { token, expired } = res.data;
      updateAxios(token);
      updateCookie(token, expired)
      if (state?.key === 'admin'){
        navigate("/admin");
      }else{
        navigate("/");
      }
    } catch (error) {
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '請重新操作'+error }));
    }
  };

  const checkFn = (boolean) => {
    setCheck(boolean);
  };

  const adminLoadingFn = (boolean) => {
    setAdminLoading(boolean);
  };

  const checkLogin = useCallback(async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/v2/api/user/check`);
      if (res.data.success) {
        checkFn(true);
      }else{
        checkFn(false);
      }
    } catch (error) {
      checkFn(false);
      dispatch(createAsyncMsg({ success: false, id: new Date().getTime(), message: '請重新操作' + error }));
    } finally {
      adminLoadingFn(false)
    }
  }, [dispatch])

  useEffect(() => {
    if (isAdmin) {
      adminLoadingFn(true);
      const token = getCookie('token');
      
      if (token) {
        updateAxios(token);
        checkLogin();
      } else {
        checkFn(false);
        adminLoadingFn(false);
      }
    }
  }, [isAdmin, checkLogin]);
  
  if (isAdmin) {
    if (!isCheck){
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            isAdminLoading ? <Loading title='正在檢驗身分中...' /> : ''
          }
          <div className='container py-5'>
            <div className='row justify-content-center'>
              <div className='col-md-6'>
                <h2>登入帳號</h2>
                <div className='mb-2'>
                  <InputDom
                    register={register}
                    errors={errors}
                    id='email'
                    labelText='Email'
                    type='email'
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
                    id='password'
                    labelText='password'
                    type='password'
                    rules={{
                      required: {
                        value: true,
                        message: "password 為必填",
                      },
                      pattern: {
                        value: /[A-Za-z\d]{5,}/i,
                        message: "password 格式不正確",
                      },
                    }}
                  />
                </div>
                <button type='submit' className='btn btn-primary w-100'>
                  登入
                </button>
              </div>
            </div>
          </div>
        </form>
      )
    }else{
      navigate('/admin')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='container py-5'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <h2>登入帳號</h2>
            <div className='mb-2'>
              <InputDom
                register={register}
                errors={errors}
                id='email'
                labelText='Email'
                type='email'
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
                id='password'
                labelText='password'
                type='password'
                rules={{
                  required: {
                    value: true,
                    message: "password 為必填",
                  },
                  pattern: {
                    value: /[A-Za-z\d]{5,}/i,
                    message: "password 格式不正確",
                  },
                }}
              />
            </div>
            <button type='submit' className='btn btn-primary w-100'>
              登入
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}