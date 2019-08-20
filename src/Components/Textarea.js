import React from "react";
import styled from "styled-components";

const StyledArea = styled.textarea`
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1) !important;
  border-color: #dbdbdb !important;
  min-height: 120px;
`;

const Textarea = ({ onChange, value, placeholder, label }) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className="control">
        {/* has-icons-left has-icons-right */}
        <StyledArea
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {/* <p className="help is-success">This username is available</p> */}
    </div>
  );
};

export default Textarea;
