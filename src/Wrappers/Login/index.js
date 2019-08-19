import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { signInLoading, signIn, signInError } from './actions'
import Container from '../../Components/Container';
// import { Api } from '../../utils/request'

const Login = (props) => {
  const { handleLogin, auth, firebase } = props
  const [email, setEmail] = useState("marcinjak9@gmail.com")
  const [password, setPassword] = useState("password")
  useEffect(() => {
    // console.log(firebase.auth().currentUser)
    // firebase.auth().currentUser.getIdToken()
    //   .then(t => console.log(t))
    //   .catch(e => console.log(e))
  },[])

  const submit = (e) => {
    e.preventDefault()
    // handleLogin(email, password)
    firebase.login({ email, password })
  }
  
  if (!isLoaded(auth)) {
    return <span>Loading...</span>
  }
  if (isEmpty(auth)) {
    return (
      <div className="section">
        <Container small>
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Email" value={email} onChange={({ target: { value }}) => setEmail(value)} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type="password" placeholder="Password" value={password} onChange={({ target: { value }}) => setPassword(value)} />
            </div>
          </div>
          <button className="button is-primary" onClick={submit}>
            Login
          </button>
        </Container>
      </div>
    )
  }
  return <Redirect to="/" />
}

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: async (email, password) => {
      // dispatch(signInLoading())
      // try {
      //   const { user } = await Api().auth.signInWithEmailAndPassword(email, password)
      //   dispatch(signIn(user))
      // } catch (error) {
      //   console.log(error)
      //   dispatch(signInError(error))
      // }
    }
  }
}

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(Login)

// export default enhance(Login)
