import axios from "axios";
import PropTypes from 'prop-types';

export default function DeleteProduct({ eventHide, tempProduct, getProducts }) {
  const removeItem = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_BASE}/api/${import.meta.env.VITE_API_PATH}/admin/product/${tempProduct?.id}`,
      );
      if(res.data.success){
        eventHide();
        getProducts();
      }
    } catch (error) {
      alert('刪除產品失敗' + error);
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
          <div className='modal-body'>刪除品項:{tempProduct?.title}</div>
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

DeleteProduct.propTypes = {
  eventHide: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  tempProduct: PropTypes.object.isRequired,
};