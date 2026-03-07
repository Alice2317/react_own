import { InfinitySpin } from "react-loader-spinner";
import PropTypes from 'prop-types';

export default function Loading({ title, content }) {
  return (
    <div
      className='position-fixed top-0 start-0 end-0 bottom-0 w-100 bg-light opacity-75'
      style={{ zIndex: "999", backdropFilter: "blur(2px)" }}
    >
      <div className='position-absolute top-50 start-50 translate-middle text-center'>
        <InfinitySpin width='200' color='#4fa94d' />
        <h4>
          <b>{title}</b>
        </h4>
        <p>{content}</p>
      </div>
    </div>
  );
}

Loading.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};