import React, { Component } from 'react';
import { UserContext } from './context';
import connection from './server';
import { Modal } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../src/layouts/DefaultLayout/DefaultLayout';
import LoginUser from '../src/layouts/LoginUser/LoginUser';
import WritePage from '../src/layouts/WritePage/WritePage';
import './App.css';

const confirm = Modal.confirm;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      isLogin: false,
      isOutLog: true,
      context: UserContext.contect,
      toggleTheme: this.updateContext,
      outlog: this.logOut,
      updatePsw: (res) => this.onClickUpdate(res),
      changeUserInfo: (id) => this.getUserInfo(id),
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

  // 退出登录
  logOut = (key) => {
    if (key === '2') {
      confirm({
        title: '确定退出登录?',
        content: '退出登录后，无法继续浏览，请重新登录后再进行其他操作',
        cancelText: '取消',
        okText: '确认',
        onOk: () => {
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
        if (JSON.parse(userMsg).data.code === 1) {
          let result = JSON.parse(userMsg).data.data;
          this.setState({
            isLogin: true
          }, () => this.getUserInfo(result.userPO.id))
        } else {
          alert('对不起您登录失败，请稍后再尝试')
        }
      }
    } else {
      alert('对不起您没有登录，请登陆后在尝试')
    }
  }

  async onClickUpdate(res) {
    if (res.newPsw === res.turePsw) {
      let data = {
        userId: res.userId,
        oldPassword: res.oldPsw,
        newPassword: res.newPsw,
      }
      const param = {
        data: data,
        path: '/users/update/pwd',
        method: 1
      }
      let result = await connection(param);
      if (result.data.code === 1) {
        confirm({
          title: '密码修改成功',
          content: '密码修改成功，点击确定重新登录',
          footer: '确定',
        });
        localStorage.removeItem('user_msg');
        this.setState({
          isLogin: false,
        })
      } else {
        alert(result.data.msg);
      }
    } else {
      alert('前后密码不一致，请确认新的密码是否输入正确');
    }
  }

  async getUserInfo(id) {
    if (id) {
      const param = {
        data: null,
        path: `/users/${id}`,
        method: 2
      }
      let res = await connection(param);
      if (res) {
        if (res.data.code === 1) {
          let data = res.data.data;
          this.setState({
            context: data,
            isLogin: true,
            src: data.userInfoPO.headUrl,
          })
        }
      }
    }
  }

  async outLogin() {
    const param = {
      data: null,
      path: '/logins/out',
      method: 2
    }
    JSON.stringify(await connection(param))
    // localStorage.removeItem('user_msg');
    this.setState({
      isLogin: false,
      isOutLog: false,
    }, () => {
      localStorage.removeItem('user_msg');
    })
  }

  // 异步方法调用登录接口
  async getResult(data) {
    const param = {
      data: data,
      path: '/logins/in',
      method: 1
    }
    // 把登录接口返回的数据放进localStorage里面
    let result = await connection(param);
    if (result.data.code === 1) {
      localStorage.setItem('user_msg', JSON.stringify(result));
      this.setState({
        isLogin: true,
      }, () => this.getLocalStorageUserMsg())
    } else {
      alert(result.data.msg)
    }
  }

  // 异步方法调用注册接口
  async getEnroll(data) {
    const param = {
      data: data,
      path: '/users/register',
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
