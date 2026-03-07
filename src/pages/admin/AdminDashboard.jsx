import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";


const updateAxios = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );


  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true, state: { key: 'admin' } });
      return;
    }
    const update = () => {
      updateAxios(token);
      setIsReady(true);
    }
    update();
  }, [token, navigate]);

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
      navigate("/");
    } catch (error) {
      alert('登出失敗' + error);
    }
  };

  return (
    <div className="container-fluid">
      <div className='bg-dark text-center py-3'>
        <p className='text-white mb-0'>後台管理系統</p>
      </div>
      <div className="row">
        <div className="col-12 col-lg-2">
          <button type="button" className="btn btn-danger rounded-0 w-100" onClick={() => logout()}>登出回前台</button>
          <ul className='list-group list-group-flush'>
            <Link
              className='list-group-item list-group-item-action py-3'
              to='/admin'
            >
              <i className='bi bi-database-fill me-2' />
              產品列表
            </Link>
            <Link className="list-group-item list-group-item-action py-3" to="coupons">
              <i className='bi bi-coin me-2' />
              優惠卷列表
            </Link>
            <Link className="list-group-item list-group-item-action py-3" to="orders">
              <i className="bi bi-box-seam-fill me-2"></i>
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="col-12 col-lg-10">
          <div className='w-100'>{isReady && <Outlet />}</div>
        </div>
      </div>
    </div>
  );
}
