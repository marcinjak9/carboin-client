import React from 'react'
// import Resizer from 'react-image-file-resizer';
import { AvatarS } from './Avatar';


const AvatarUpload = ({ src, onChange }) => {
  const onFileChange = (e) => {
    onChange(e.target.files[0])
  }
  const renderSrc = () => {
    if (typeof src === 'string') {
      return src
    }
    if (typeof src === 'object') {
      return URL.createObjectURL(src)
    }
    return ''
  }
  return (
    <div>
      <AvatarS src={renderSrc()} alt="" size={150} />
      <div className="file">
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
      </div>
    </div>
  )
}



export default AvatarUpload
