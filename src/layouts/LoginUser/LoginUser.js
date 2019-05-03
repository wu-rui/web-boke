import React, { Component } from 'react';
import login from '../../routes/Login/login';
import enroll from '../../routes/Login/enroll';
import { Route } from 'react-router-dom';



export default class LoginUser extends Component {
  render() {
    return (
      <div id="LoginUser">
        <Route path="/login" component={login} />
        <Route path="/enroll" component={enroll} />
      </div>
    );
  }
}

