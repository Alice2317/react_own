import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import AddCoupon from "./compontents/AddCoupon";
import DeleteCoupon from "./compontents/DeleteCoupon";
import Pagination from "../../compontents/Pagination";


export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [action, setAction] = useState('add');
  const [tempCoupon, setTempCoupon] = useState({});
  const addModal = useRef(null);
  const deleteModal = useRef(null);


  const getCoupons = async (page = 1) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupons?page=${page}`);
      if (res.data.success) {
        setCoupons(res.data.coupons);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      alert('得到優惠卷失敗' + error)
    }
  }

  useEffect(() => {
    (()=>{
      addModal.current = new Modal('#addModal', { backdrop: 'static' });
      deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
      getCoupons();
    })();
  }, [])

  const openModal = (type, data) => {
    setAction(type)
    setTempCoupon(data)
    if (type === 'delete') {
      deleteModal.current.show()
    } else {
      addModal.current.show()
    }
  }

  const hideModal = (type) => {
    if (type === 'delete') {
      deleteModal.current.hide()
    } else {
      addModal.current.hide()
    }
  }

  const dateFormat = (type, date) => {
    const value = new Date(date);
    if (type) {
      const year = value.getFullYear();
      const month = value.getMonth() + 1;
      const date = value.getDate();

      return year + '-' + (String(month).length < 2 ? `0${month}` : month) + '-' + (String(date).length < 2 ? `0${date}` : date)
    } else {
      return value.getTime();
    }
  }


  return (
    <div className="p-3">
      <h3>優惠卷列表</h3>
      <AddCoupon
        eventHide={() => hideModal('add')}
        getCoupons={getCoupons}
        action={action}
        tempCoupon={tempCoupon}
        dateFormat={dateFormat}
      />
      <DeleteCoupon
        eventHide={() => hideModal('delete')}
        tempCoupon={tempCoupon}
        getCoupons={getCoupons}
      />
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openModal('add')}
        >
          建立新優惠卷
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>code碼</th>
              <th>標題</th>
              <th>折扣%</th>
              <th>到期日</th>
              <th>啟用狀態</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {coupons && coupons.length > 0 ? (
              coupons.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.code}</td>
                    <td>{item.title}</td>
                    <td>{item.percent}%</td>
                    <td>{dateFormat(true, item.due_date)}</td>
                    <td>{item.is_enabled}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openModal('edit', item)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => openModal('delete', item)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan='6' className="text-center">無資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        {coupons.length !== 0 ? <Pagination pagination={pagination} getProducts={getCoupons} /> : ''}
      </div>
    </div>
  )
}