import React from 'react'
import styled from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { ReactComponent as Logo } from '../images/LOGO_NEGAVTIVO.svg';
import Avatar from './Avatar';

const NavWrapper = styled.nav`
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  background-color: #115757;
  display: flex;
  justify-content: center;

  .nav {
    width: 100%;
    padding: 20px;
    max-width: 960px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .nav-section {
    flex: 1;
    display: flex;
    align-items: center;
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end
    }

    a {
      color: #fff;
      font-weight: 700;
      padding: 5px 10px;
      text-decoration: none;
      &.active {
        border-bottom: 2px solid #fff;
      }
    }
  }
`

const NAV = {
  left: [
    { name: 'Feed', to: '/' },
    { name: 'Wallets', to: '/wallet' },
    { name: 'Process', to: '/process' },
  ],
  right: [
    { name: 'Profile', to: '/profile' }
  ]
}

const Navigation = ({
  location: { pathname }
}) => {
  return (
    <NavWrapper>
      <div className="nav">
        <div className="nav-section left">
          {NAV.left.map(n => <Link key={n.name} to={n.to} className={pathname === n.to ? 'active' : '' }>{n.name}</Link>)}
        </div>
        <div className="nav-section center">
          <Logo height={30} />
        </div>
        <div className="nav-section right">
          {/* <Link to="/profile">Profile</Link> */}
          {NAV.right.map(n => <Link key={n.name} to={n.to} className={pathname === n.to ? 'active' : '' }>{n.name}</Link>)}
          <Avatar />
        </div>
      </div>
    </NavWrapper>
  )
}

export default withRouter(Navigation)
