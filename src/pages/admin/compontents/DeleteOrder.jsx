import axios from "axios";
import PropTypes from 'prop-types';

export default function DeleteOrder({ eventHide, tempOrder, getOrders }) {
  const removeItem = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/order/${tempOrder?.id}`,
      );
      if(res.data.success){
        eventHide();
        getOrders();
      }
    } catch (error) {
      alert('刪除訂單失敗'+error);
    }
  };

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id="deleteModal"
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header bg-danger'>
            <h1 className='modal-title text-white fs-5' id='exampleModalLabel'>
              刪除確認
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={eventHide}
            />
          </div>
          <div className='modal-body'>刪除訂單:{tempOrder?.id}</div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-danger' onClick={()=>removeItem()}>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteOrder.propTypes = {
  eventHide: PropTypes.func.isRequired,
  getOrders: PropTypes.func.isRequired,
  tempOrder: PropTypes.object.isRequired,
};