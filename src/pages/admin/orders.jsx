import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Modal } from "bootstrap";
import EditOrder from "./compontents/EditOrder";
import DeleteOrder from "./compontents/DeleteOrder";
import Pagination from "../../compontents/Pagination";


export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const editModal = useRef(null);
  const deleteModal = useRef(null);


  const getOrders = async (page = 1) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=${page}`);
      if (res.data.success) {
        setOrders(res.data.orders);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      alert('得到訂單失敗' + error)
    }
  }

  useEffect(() => {
    (()=>{
      editModal.current = new Modal('#editModal', { backdrop: 'static' });
      deleteModal.current = new Modal('#deleteModal', { backdrop: 'static' });
      getOrders();
    })();
  }, [])

  const currency = (num) => {
    const n = parseInt(num, 10)
    return `${n
      .toFixed(0)
      .replace(/./g, (c, i, a) =>
        i && c !== '.' && (a.length - i) % 3 === 0
          ? `, ${c}`.replace(/\s/g, '')
          : c
      )}`
  }

  const date = (time) => {
    const day = new Date(time * 1000).toLocaleDateString(
      'en-US',
      { day: '2-digit' }
    )
    const month = new Date(time * 1000).toLocaleDateString(
      'en-US',
      { month: '2-digit' }
    )
    const year = new Date(time * 1000).getFullYear()
    return `${year}-${month}-${day}`
  }

  const openModal = (type, data) => {
    setTempOrder(data)
    if (type === 'delete') {
      deleteModal.current.show()
    } else {
      editModal.current.show()
    }
  }
  

  const hideModal = (type) => {
    if (type === 'delete') {
      deleteModal.current.hide()
    } else {
      editModal.current.hide()
    }
  }

  return (
    <div className="p-3">
      <h3>訂單列表</h3>
      <EditOrder
        eventHide={() => hideModal('edit')}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <DeleteOrder
        eventHide={() => hideModal('delete')}
        tempOrder={tempOrder}
        getOrders={getOrders}
      />
      <div className="table-responsive">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>建立時間</th>
              <th>訂單編號</th>
              <th>姓名</th>
              <th>金額</th>
              <th>備註</th>
              <th>付款狀態</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map(item => (
                <tr key={item.id}>
                  <td>{date(item.create_at)}</td>
                  <td>{item.id}</td>
                  <td>{item.user?.name}</td>
                  <td>NT$ {currency(item.total)}</td>
                  <td>{item.message === undefined ? "無" : item.message}</td>
                  <td>{item.is_paid ? "YES" : 'NO'}</td>
                  <td>
                    <div className="btn-group">
                      <a
                        href={`https://www.google.com/maps/place/${item.user?.address}`}
                        className="btn btn-outline-primary d-flex"
                        target="_"
                      >
                        <span className="material-symbols-outlined fs-6">map</span>
                      </a>
                      <a
                        href={`tel:${item.user?.tel}`}
                        className="btn btn-outline-primary d-flex"
                      >
                        <span className="material-symbols-outlined fs-6">call</span>
                      </a>
                      <a
                        href={`mailto:${item.user?.email}`}
                        className="btn btn-outline-primary d-flex"
                      >
                        <span className="material-symbols-outlined fs-6">email</span>
                      </a>
                      <button
                        type="button"
                        className="btn btn-outline-primary d-flex"
                        onClick={() => openModal('edit',item)}
                      >
                        <span className="material-symbols-outlined fs-6">edit</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger d-flex"
                        onClick={() => openModal('delete',item)}
                      >
                        <span className="material-symbols-outlined fs-6">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' className="text-center">無資料</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        {orders.length !== 0 ? <Pagination pagination={pagination} getProducts={getOrders} /> : ''}
      </div>
    </div>
  )
}