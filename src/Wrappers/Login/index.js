import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signInLoading, signIn, signInError } from './actions'
import firebase from '../../App'

const Login = ({ handleLogin, auth: { user } }) => {
  const [email, setEmail] = useState("marcinjak9@gmail.com")
  const [password, setPassword] = useState("password")

  useEffect(() => {
    // console.log(firebase.auth().currentUser)
    // firebase.auth().currentUser.getIdToken()
    //   .then(t => console.log(t))
    //   .catch(e => console.log(e))
  },[])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleLogin(email, password)
  }
  
  if (user && user.uid) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: async (email, password) => {
      dispatch(signInLoading())
      try {
        const { user } = await firebase.doSignInWithEmailAndPassword(email, password)
        dispatch(signIn(user))
      } catch (error) {
        console.log(error)
        dispatch(signInError(error))
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
