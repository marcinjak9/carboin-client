import React from 'react'
import _ from 'lodash'
import styled from 'styled-components'

const Fixed = styled.div`
  position: fixed;
  bottom: ${props => (props.show ? '0' : '-200px')};
  left: 0;
  right: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  padding: 2rem;
  background-color: #fff;
  transition: all .5s;

  b {
    font-weight: 700;
  }

  h2 {
    font-size: 20px;
    &:first-child {
      margin-bottom: 1rem;
    }
  }
`;

const TotalDonaton = ({ transactions }) => {
  const s = _.sumBy(transactions, (t) => {
    if (t.selected) {
      return 2.8
    }
    return 0
  })
  return (
    <Fixed show={!!s}>
      <div>
        <div>
          <div>
            <h2>You are going to regenerate: <b>{(Math.floor(s) * 288).toLocaleString()} of CO2</b></h2>
            <h2>Planting <b>{(Math.floor(s))}</b> 🌲</h2>
          </div>
          <div>
            <button variant="button is-primary" style={{ float: 'right' }}>Proceed</button>
          </div>
        </div>
      </div>
    </Fixed>
  )
}

export default TotalDonaton
