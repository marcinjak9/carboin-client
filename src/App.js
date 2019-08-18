import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Reset } from 'styled-reset'
import { Provider } from 'react-redux'
import Home from './Wrappers/Home'
import Login from './Wrappers/Login'
import Navbar from './Components/Navbar'
import Wallet from './Wrappers/Wallet';
import Wallets from './Wrappers/Wallets';
import PrivateRoute from './Components/PrivateRoute';
import store from './store'
import { Api } from './utils/request'
import Auth from './Wrappers/Auth';
import Profile from './Wrappers/Profile';
import './styles/app.scss'
import Footer from './Components/Footer';

// export const firebase = new Firebase()

const App = () => {
  console.log(process.env)
  useEffect(() => {
    const api = Api()
  }, [])
  return (
    <Provider store={store}>
      <Reset />
      <Auth />
      <Router>
        <Navbar />
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/wallet" component={Wallets} />
        <PrivateRoute path="/wallet/create" exact component={Wallet} />
        <PrivateRoute path="/wallet/:id" exact component={Wallet} />
        <PrivateRoute path="/wallet/:id/edit" exact component={Wallet} />
        <PrivateRoute path="/profile" component={Profile} />
      </Router>
      <Footer />
    </Provider>
  );
}


export default App;
