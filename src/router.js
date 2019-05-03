import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../src/layouts/DefaultLayout/DefaultLayout';
// import LoginUser from '../src/layouts/LoginUser/LoginUser';
import WritePage from '../src/layouts/WritePage/WritePage';

export default class RouterWrap extends Component {
    render() {
        return (
            <div id="router">
                <Router>
                    <Switch>
                        {/* <Route path="/login" component={LoginUser} /> */}
                        <Route path="/write" component={WritePage} />
                        <Route path="/" component={DefaultLayout} />
                    </Switch>
                </Router>
            </div>
        )
    }
}
