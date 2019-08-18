import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ auth: { loading, user, error }, component: Component, ...rest }) => {
  console.log(loading)
  if (error) {
    return <p>An error occured</p>
  }
  if (loading || user === null) {
    return <p>Loading</p>
  }
  return (
    <Route
      {...rest}
      render={props =>
        (user && user.uid) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, null)(PrivateRoute)
