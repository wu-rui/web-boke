import React, { Component } from 'react';
import { UserContext } from './context';
// import RouterWrap from './router';
import connection from './server';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../src/layouts/DefaultLayout/DefaultLayout';
import LoginUser from '../src/layouts/LoginUser/LoginUser';
import WritePage from '../src/layouts/WritePage/WritePage';
import './App.css';

// const data = {
//   username: "徐高俊",
//   password: "123456"
// }


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      context: UserContext.contect,
      toggleTheme: this.updateContext,
    }
  }
  componentDidMount() {
    this.getLocalStorageUserMsg();
  }

  /*这里需要注意后期优化在safari的private模式下
  * localS torage会返回null，导致程序错误
  */

  updateContext = (username, password) => {
    let data = {}
    if (username !== null && password !== null) {
      data.username = username;
      data.password = password;
      this.getResult(data);
    } else {
      alert("用户名和密码不能为空，请填写后尝试");
    }
  }

  getLocalStorageUserMsg() {
    if (localStorage.user_msg) {
      let userMsg = localStorage.user_msg;
      if (userMsg !== null && userMsg !== undefined && userMsg.length > 0) {
        this.setState({
          context: JSON.parse(userMsg).data.data,
          isLogin: true
        }, () => {
          console.log('gengxinchengglm ', this.state.context)
        })
      }
    }
  }

  async getResult(data) {
    const param = {
      data: data,
      path: '/logins/in',
      method: 1
    }
    localStorage.setItem('user_msg', JSON.stringify(await connection(param)));
    this.getLocalStorageUserMsg();
  }

  render() {
    console.log('app', this.state)
    return (
      <div className="App">
        <UserContext.Provider value={this.state}>
          <Router>
            <Switch>
              <Route path="/login" component={LoginUser} />
              <Route path="/write" component={WritePage} />
              <Route path="/" component={DefaultLayout} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
