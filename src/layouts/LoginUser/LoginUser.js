import React, { Component } from 'react';
import login from '../../routes/Login/login';
import { Route } from 'react-router-dom';



export default class LoginUser extends Component {
  render() {
    return (
      <div id="LoginUser">
        <Route path="/login" component={login} />
      </div>
    );
  }
}

