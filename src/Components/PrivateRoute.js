import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'

const PrivateRoute = ({ auth, component: Component, ...rest }) => {
  if (!isLoaded(auth)) {
    return <p>Loading</p>
  }
  return (
    <Route
      {...rest}
      render={props =>
        (!isEmpty(auth)) ? (
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

const mapStateToProps = ({ firebase: { auth } }) => ({ auth })

export default connect(mapStateToProps, null)(PrivateRoute)
