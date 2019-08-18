import { useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn } from './Login/actions'
import { Api } from '../utils/request'

const Auth = ({ success }) => {
  useEffect(() => {
    Api().auth.onAuthStateChanged((user) => {
      if (user) {
        success(user)
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
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(Auth)
