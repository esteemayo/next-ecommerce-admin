'use client';

import PropTypes from 'prop-types';

const TextArea = ({ name, label, ...rest }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        id={name}
        name={name}
      />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rest: PropTypes.any,
};

export default TextArea;
