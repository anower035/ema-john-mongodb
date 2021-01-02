import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shops from './components/Shops/Shops';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Inventory from './components/Inventory/Inventory';
import Notfound from './components/Notfound/Notfound';
import Review from './components/Review/Review';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext=createContext();

function App() {
  const [loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h3> email:{loggedInUser.email}</h3>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shops></Shops>
          </Route>
          <Route path="/review">
              <Review></Review>
          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/">
            <Shops></Shops>
          </Route>
          <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
      
    </UserContext.Provider>
  );
}

export default App;
