import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HeadNav from '../../common/headNav/headNav';
import Footer from '../../common/footer/footer';
import Home from '../../routes/Home/Home';
import login from '../../routes/Login/login';
import enroll from '../../routes/Login/enroll';
import center from '../../routes/userCenter/center';

import './DefaultLayout.less'
export default class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMsg: this.props.userMsg
    };
  }
  render() {
    return (
      <div id="DefaultLayout">
        <HeadNav match={this.props.match} location={this.props.location} history={this.props.history} />
        <div className="content-wrap">
          <Route path="/" component={Home} exact />
          <Route path="/center" component={center} />
        </div>
        <Footer />
      </div >
    );
  }
}

