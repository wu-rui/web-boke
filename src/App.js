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
    this.updateContext = (data) => {
      this.getResult(data)
    }
    this.state = {
      context: UserContext.contect,
      toggleTheme: this.toggleTheme,
    }
  }
  componentDidMount() {
    // this.getLocalStorageUserMsg();
  }

  /*这里需要注意后期优化在safari的private模式下
  * localS torage会返回null，导致程序错误
  */
  getLocalStorageUserMsg() {
    let userMsg = localStorage.user_msg;
    if (userMsg !== null && userMsg !== undefined && userMsg.length > 0) {
      this.setState({
        context: userMsg,
      })
    } else {
      alert("不好意思，登录失败");
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
