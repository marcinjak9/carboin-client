import React from "react";
// import Resizer from 'react-image-file-resizer';
import styled from "styled-components";
import { AvatarS } from "./Avatar";

const Uploader = styled.div`
  .file-input {
    display: none;
  }
  label {
    cursor: pointer;
    position: relative;
    display: inline-block;

    .is-overlay {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 150px;
      height: 150px;
      opacity: 0;
    }

    &:hover {
      span {
        opacity: 1;
      }
      .is-overlay {
        opacity: 1;
      }
    }
  }
  span {
    opacity: 0;
    color: #fff;
    font-weight: 700;
  }
`;

const AvatarUpload = ({ src, onChange }) => {
  const onFileChange = e => {
    onChange(e.target.files[0]);
  };
  const renderSrc = () => {
    if (typeof src === "string" && src) {
      return src;
    }
    if (typeof src === "object") {
      return URL.createObjectURL(src);
    }
    return "https://www.gravatar.com/avatar/";
  };
  return (
    <Uploader>
      <label htmlFor="avatar">
        <input
          className="file-input"
          type="file"
          name="avatar"
          id="avatar"
          onChange={onFileChange}
        />
        <AvatarS src={renderSrc()} alt="" size={150} />
        <div className="is-overlay">
          <span>Click to edit</span>
        </div>
      </label>
      {/* <div className="file">
        <label className="file-label">
          <input
            className="file-input"
            type="file"
            name="avatar"
            onChange={onFileChange}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose an image…
            </span>
          </span>
        </label>
      </div> */}
    </Uploader>
  );
};

export default AvatarUpload;
