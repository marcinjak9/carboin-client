import React from "react";
import styled from "styled-components";
import classNames from "classnames";

const StyledInput = styled.input`
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1) !important;
  border-color: #dbdbdb !important;

  &.is-danger {
    border-color: #ff3860 !important;
  }
`;

const Input = ({ onChange, value, type, placeholder, label, rows, error }) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        {/* has-icons-left has-icons-right */}
        <StyledInput
          className={classNames("input", { "is-danger": error })}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        />
      </div>
      {error && (
        <p className="help is-danger">
          {typeof error === "string" ? error : "Invalid email"}
        </p>
      )}
    </div>
  );
};

export default Input;
