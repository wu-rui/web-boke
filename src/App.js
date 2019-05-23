import React, { Component } from 'react';
import { UserContext } from './context';
// import RouterWrap from './router';
import connection from './server';
import { Modal } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../src/layouts/DefaultLayout/DefaultLayout';
import LoginUser from '../src/layouts/LoginUser/LoginUser';
import WritePage from '../src/layouts/WritePage/WritePage';
import './App.css';

const confirm = Modal.confirm;

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
      outlog: this.logOut,
    }
  }
  componentDidMount() {
    this.getLocalStorageUserMsg();
  }

  /*这里需要注意后期优化在safari的private模式下
  * localS torage会返回null，导致程序错误
  */

  // 登录页面点击登录按钮获取输入内容，调用接口
  updateContext = (username, password, type) => {
    let data = {}
    if (username !== null && password !== null) {
      data.username = username;
      data.password = password;
      if (type === 1) {
        this.getResult(data);
      } else {
        this.getEnroll(data);
      }
    } else {
      alert("用户名和密码不能为空，请填写后尝试");
    }
  }

  logOut = (key) => {
    if (key === '2') {
      confirm({
        title: '确定退出登录?',
        content: '退出登录后，无法继续浏览，请重新登录后再进行其他操作',
        cancelText: '取消',
        okText: '确认',
        onOk: () => {
          console.log('OK');
          this.outLogin();
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }

  // 从localStorage里面获取用户数据
  getLocalStorageUserMsg() {
    if (localStorage.user_msg !== 'undefined') {
      let userMsg = localStorage.user_msg;
      if (userMsg !== null && userMsg !== undefined && userMsg.length > 0) {
        this.setState({
          context: JSON.parse(userMsg).data.data,
          isLogin: true
        })
      }
    } else {
      alert('对不起您没有登录，请登陆后在尝试')
    }
  }

  async outLogin() {
    const param = {
      data: null,
      path: '/logins/out',
      method: 2
    }
    let result = JSON.stringify(await connection(param))
    if (result.code === 1) {
      localStorage.removeItem('user_msg');
      this.setState({
        isLogin: false,
      }, () => {
        this.getLocalStorageUserMsg()
      })
    } else {
      confirm({
        title: '退出登录失败',
        content: '请稍后再尝试',
        cancelText: '取消',
        okText: '确认',
        onOk: () => {
          console.log('OK');
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
  // 异步方法调用登录接口
  async getResult(data) {
    const param = {
      data: data,
      path: '/logins/in',
      method: 1
    }
    // 把登录接口返回的数据放进localStorage里面
    localStorage.setItem('user_msg', JSON.stringify(await connection(param)));
    this.getLocalStorageUserMsg();
  }

  // 异步方法调用注册接口
  async getEnroll(data) {
    const param = {
      data: data,
      path: '/logins/in',
      method: 1
    }
    // 把登录接口返回的数据放进localStorage里面
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
