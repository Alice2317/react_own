import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "../compontents/Pagination";
import { Link } from "react-router";
import Loading from "../compontents/Loading";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  
  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`);
      if (res.data.success) {
        setProducts(res.data.products);
        setPagination(res.data.pagination);
        setLoading(false);
      }
    } catch (error) {
      setError(error.data.success);
    }
  }

  useEffect(() => {
    (()=>{
      getProducts();
    })();
  }, [])
  
  return (
    <>
      {isLoading?
      (<Loading title='正在處理中' />):
      (<div className="container mt-md-5 mt-3 mb-7">
        <div className="row">
          {
            products.map(item=>{
              return (
                <div className="col-md-3" key={item.id}>
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <img src={item.imageUrl} alt={item.title} />
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-3"><Link to={`/product/${item.id}`} key={item.id}>{item.title}</Link></h4>
                      <p className="text-muted mt-3">NT$ {item.price}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <nav className="d-flex justify-content-center">
          {isError ? null :
            <Pagination
              pagination={pagination}
              getProducts={getProducts}
            />
          }
        </nav>
        
      </div>)}
    </>
  )
}