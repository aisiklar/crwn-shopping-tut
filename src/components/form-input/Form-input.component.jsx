import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  /* console.log(
    `props from parent.. label: ${label}, ...otherProps: ${JSON.stringify(
      otherProps
    )}`
  );
 */
  return (
    <div className="group">
      <input className="form-input" {...otherProps}></input>
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
