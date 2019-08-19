import { useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn, logout } from './Login/actions'
import { Api } from '../utils/request'

const Auth = ({ success, error, auth }) => {
  console.log(auth)
  useEffect(() => {
    Api().auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        success(user)
      } else {
        error()
      }
    })
  }, [])
  return null;
}


const mapDispatchToProps = dispatch => {
  return {
    success: (user) => {
      const u = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      dispatch(signIn(u))
    },
    error: () => dispatch(logout())
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  mapDispatchToProps,
)(Auth)
