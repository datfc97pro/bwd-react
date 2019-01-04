import React from "react";
import titleize from "titleize";

export const BwmSelect = ({
  input,
  label,
  options,
  className,
  meta: { touched, error, warning }
}) => {
  const renderOptions = () => {
    return options.map((option, index) => {
      return (
        <option key={index} value={option}>
          {titleize(option)}
        </option>
      );
    });
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="input-group">
        <select {...input} className={className}>
          {renderOptions()}
        </select>
      </div>
      {touched && (error && <div className="alert alert-danger">{error}</div>)}
    </div>
  );
};
