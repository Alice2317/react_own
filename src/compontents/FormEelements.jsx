import PropTypes from 'prop-types';

export const InputDom =({ register, errors, id, labelText, type, rules })=>{
  return <>
    <label htmlFor={id} className='form-label'>
      {labelText}
    </label>
    <input
      id={id}
      type={type}
      {...register(id, rules)}
      className={`form-control ${errors[id] && 'is-invalid'}`}
    />
    {errors[id] && (
      <div className='invalid-feedback'>{errors[id]?.message}</div>
    )}
  </>
}

InputDom.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
};