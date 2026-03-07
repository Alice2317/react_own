import PropTypes from 'prop-types';

export default function Pagination({ getProducts, pagination }){
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button type="button" aria-label="Previous"
            className={`page-link ${!pagination.has_pre && 'disabled'}`}
            onClick={() => {
              getProducts(pagination.current_page - 1);
            }}>
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {
          Array.from({ length: pagination.total_pages }, (_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <a
                className={`page-link ${(i + 1 === pagination.current_page) && 'active'}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  getProducts(i + 1);
                }}
              >
                {i + 1}
              </a>
            </li>
          ))
        }
        <li className="page-item">
          <button type="button" aria-label="Next"
            className={`page-link ${!pagination.has_next && 'disabled'}`}
            onClick={() => {
              getProducts(pagination.current_page + 1);
            }}>
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  )
};

Pagination.propTypes = {
  getProducts: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
};