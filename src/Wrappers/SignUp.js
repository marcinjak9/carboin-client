import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import withFirebase from 'react-redux-firebase/lib/withFirebase'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import Container from '../Components/Container'

const SignUp = ({ auth, firebase }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  function submit() {
    firebase.createUser({
      email, password
    }, { email, displayName: name, avatar: '' })
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
              <input className="input" type="text" placeholder="Name" value={name} onChange={({ target: { value }}) => setName(value)} />
            </div>
          </div>
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
            Sign up
          </button>
        </Container>
      </div>
    )
  }
  return <Redirect to="/" />
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(SignUp)
