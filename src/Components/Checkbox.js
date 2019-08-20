import React from "react";
import styled from "styled-components";

const StyledBox = styled.div`
  input {
    margin-right: 0.5rem;
  }
`;

const Checkbox = ({ label, checked, onChange, help }) => {
  return (
    <StyledBox className="field">
      <div className="control">
        <label className="checkbox">
          <input type="checkbox" checked={checked} onChange={onChange} />
          {label}
        </label>
      </div>
      <p className="help">{help}</p>
    </StyledBox>
  );
};

Checkbox.defaultProps = {
  label: "My awesome label",
  checked: false,
  onChange: () => null
};

export default Checkbox;
