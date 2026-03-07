import {Link} from 'react-router';
export default function Footer() {

  return (
    <div className='bg-dark py-4 position-relative bottom-0 end-0 start-0'>
      <div className='container d-flex justify-content-between text-white'>
        <span>2026 React 作品集用</span>
        <Link className='btn border-0 text-white' state={{ key: 'admin' }} to='/login'>
          廠商
        </Link>
      </div>
    </div>
  );
}
