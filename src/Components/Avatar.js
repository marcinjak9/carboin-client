import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Api } from '../utils/request'

const AvatarS = styled.img`
  background-color: #fff;
  padding: 4px;
  width: ${props => (props.size ? `${props.size}px` : '28px')};
  color: rgb(97, 97, 97);
  height: ${props => (props.size ? `${props.size}px` : '28px')};
  font-size: 1rem;
  border-radius: 50%;
`

const Avatar = ({ auth, id, size }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (id) {
      fetchPhoto(id)
    } else if (auth.user && !url) {
      fetchPhoto()
    }
  }, auth.user ? [auth.user.photoURL] : [''])

  async function fetchPhoto() {
    const u = await Api().getImage(auth.user.photoURL)
    setUrl(u)
  }

  return (
    <AvatarS src={url} size={size} />
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Avatar)
