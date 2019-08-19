import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import md5 from 'md5'

const AvatarS = styled.img`
  background-color: #fff;
  padding: 4px;
  width: ${props => (props.size ? `${props.size}px` : '28px')};
  color: rgb(97, 97, 97);
  height: ${props => (props.size ? `${props.size}px` : '28px')};
  font-size: 1rem;
  border-radius: 50%;
`

const Avatar = ({ auth, size }) => {
  let url = 'https://www.gravatar.com/avatar/'
  if (auth && auth.user) {
    if (auth.user.photoURL) {
      url = auth.user.photoURL;
    } else {
      url = `https://www.gravatar.com/avatar/${md5(auth.user.email)}`
    }
  }
  return (
    <AvatarS src={url} size={size} />
  )
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default connect(mapStateToProps)(Avatar)
