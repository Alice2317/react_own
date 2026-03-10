import axios from "axios";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState('');

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/products/all`,
      );
      if (res.data.success) {
        setProducts(res.data.products);
        const hot = res.data.products.filter((item) =>
          item.category.match("hot"),
        );
        setHotProducts(hot);
      }
    } catch (error) {
      alert("熱門產品渲染失敗" + error);
    }
  };
  const getArticles = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/v2/api/${import.meta.env.VITE_API_PATH}/articles`,
      );
      if (res.data.success) {
        const articles = res.data.articles.filter((item) =>
          item.tag.includes("顧客推薦"),
        );
        setArticles(articles);
      }
    } catch (error) {
      alert("評價渲染失敗" + error);
    }
  };

  const search =()=>{
    if (products.length === 0 || keyword === "") return;
    const tempProduct = products.filter(
      (item) => item.title.match(keyword) || item.category.match(keyword),
    );
    navigate("/search", {
      state: {
        keyword: keyword,
        products:tempProduct
      }
    });
  }

  useEffect(() => {
    (() => {
      getProducts();
      getArticles();
    })();
  }, []);

  return (
    <div className='container'>
      <div className='row flex-md-row-reverse flex-column'>
        <div className='col-md-6'>
          <img src='./banner.jpg' alt='banner' className='img-fluid' />
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-center mt-md-0 mt-3'>
          <h2 className='fw-bold'>新年快樂</h2>
          <h5 className='font-weight-normal text-muted mt-2'>
            2/16 - 2/22 全館商品不限種類打5折
          </h5>
          <div className='input-group mb-0 mt-4'>
            <input
              type='text'
              className='form-control rounded-0'
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className='input-group-append'>
              <button
                className='btn btn-dark rounded-0'
                type='button'
                id='search'
                onClick={() => search()}
              >
                搜尋
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-between align-items-center mt-5'>
        <h2 className='text-center fw-bold'>熱門商品</h2>
        <span
          onClick={() => {
            navigate("/products");
          }}
        >
          MORE
          <i className='bi bi-caret-right-fill'></i>
        </span>
      </div>
      <div className='row g-2 mb-5'>
        {hotProducts.map((item) => {
          return (
            <div className='col-12 col-sm-6 col-md-4 mt-md-4' key={item.id}>
              <img src={item.imageUrl}
                    className='img-fluid'
                    alt='主圖'
                  />
              <div className="d-block d-md-flex justify-content-md-between align-items-md-center">
                <h4 className="mt-2">{item.title}</h4>
                <small>NT$ {item.price}</small>
              </div>
            </div>
          );
        })}
      </div>
      <div className='d-flex justify-content-between align-items-center mt-5'>
        <h2 className='text-center fw-bold'>最新評價</h2>
        ++++++
      </div>
      <div className='row g-2 mb-5'>
        {articles.map((item) => {
          return (
            <div className='col-12 col-sm-6 col-md-4' key={item.id}>
              <div className="card border-0 rounded-0">
                <img src={item.image} className="card-img h-250 opacity-50" alt="作者" />
                <div className="card-img-overlay">
                  <h5 className='card-title'>{item.title}</h5>
                  <p className='card-text'>{item.description}</p>
                  <p className='card-text'>{item.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
