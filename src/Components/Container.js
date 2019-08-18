import React from 'react'
import styled from 'styled-components'

const C = styled.div`
  max-width: ${props => (props.small ? '600px' : '')} !important;
`

const Container = (props) => <C className="container" small={props.small}>{props.children}</C>

export default Container