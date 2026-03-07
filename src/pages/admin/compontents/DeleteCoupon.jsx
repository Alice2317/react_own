import axios from "axios";
import PropTypes from 'prop-types';

export default function DeleteCoupon({ eventHide, tempCoupon, getCoupons }) {
  const removeItem = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${tempCoupon?.id}`);
      if(res.success){
        eventHide();
        getCoupons();
      }
    } catch (error) {
      alert('刪除優惠卷失敗'+error);
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
          <div className='modal-body'>刪除優惠卷:{tempCoupon?.title}</div>
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

DeleteCoupon.propTypes = {
  eventHide: PropTypes.func.isRequired,
  getCoupons: PropTypes.func.isRequired,
  tempCoupon: PropTypes.object.isRequired,
};