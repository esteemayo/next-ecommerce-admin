'use client';

const Textarea = ({ name, label, ...rest }) => {
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

export default Textarea;
