import { Link } from "react-router";
export default function NotFound(){
  return (
    <>
      <h3 className="mt-5">404 找不到內容</h3>
      <Link tp="/" className="btn btn-outline-dark" >回首頁</Link>
    </>
  );
};