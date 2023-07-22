'use client';

import PropTypes from 'prop-types';

const Input = ({ name, label, type = 'text', ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id={name}
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
