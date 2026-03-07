import { Link, useParams, useLocation } from "react-router"

export default function CheckoutSusccess() {
  const { id } = useParams();
  const location = useLocation();
  const { title, content } = location.state || {};
  
  return(
    <div className="container">
      <div className="mt-5 mb-7" style={{height:'80vh'}}>
        <div className="row">
          <div className="col-md-3">
            <h2>{title}成功</h2>
            <p>編號:{id}</p>
            <p>{content}</p>
            <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">回首頁</Link>
          </div>
          <div className="col-md-9">
            <div className="background-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}