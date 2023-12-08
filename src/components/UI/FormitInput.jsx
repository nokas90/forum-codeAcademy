const FormikInput = ({ type, name, formik, placeholder, rows, columns }) => {
  const isTextArea = type === 'textarea';

  return (
    <div>
      <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
      {isTextArea ? (
        <textarea
          name={name}
          id={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder ? placeholder : ''}
          rows={rows}
          columns={columns}
          style={{ resize: 'none' }} 
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder ? placeholder : ''}
        />
      )}
      {formik.touched[name] && formik.errors[name] && (
        <p style={{ color: "red" }}>{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default FormikInput;
