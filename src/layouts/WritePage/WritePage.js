import React, { Component } from 'react';
// import { Route } from 'react-router-dom';
import Article from '../../routes/Article/Article';
import { UserContext } from '../../context';

import './WritePage.less'
export default class WritePage extends Component {
  render() {
    return (
      <UserContext.Consumer>
        {(states) => (
          <div id="WritePage">
            <Article userMsg={states.context} />
          </div >
        )}
      </UserContext.Consumer>
    );
  }
}