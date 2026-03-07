import { useLocation, Link } from "react-router";

export default function Search() {
  const location = useLocation();

  return (
    <div className='container'>
      <h2 className='text-center mt-md-5 mt-3 mb-5 fw-bold'>
        搜尋關鍵字:
        {location.state?.keyword}
      </h2>
      <div className='row'>
        {location.state?.products.map((item) => {
          return (
            <div className='col-md-3' key={item.id}>
              <div className='card border-0 mb-4 position-relative position-relative'>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                />
                <div className='card-body p-0'>
                  <h4 className='mb-0 mt-3'>
                    <Link
                      className='nav-link'
                      to={`/product/${item.id}`}
                      key={item.id}
                    >
                      {item.title}
                    </Link>
                  </h4>
                  <p className='text-muted mt-3'>NT$ {item.price}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}