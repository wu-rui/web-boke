import React, { Component } from 'react';
import { Icon } from 'antd';
import { UserContext } from '../../context';
import { Redirect } from 'react-router';
import './login-enroll.less'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    }
  }
  userInput = (e) => {
    this.setState({

      username: e.target.value,

    })
  }
  pswInput = (e) => {
    this.setState({
      password: e.target.value,
    })
  }
  onLogin = () => {
    console.log(this);
    let data = {};
    let username = this.state.loginName;
    let password = this.state.loginPsw;
    if (username !== null && password == null) {
      data.username = this.state.loginName;
      data.password = this.state.loginPsw;
      this.props.toggleTheme(data);
    } else {
      return false;
    }
  }
  render() {
    return (
      <UserContext.Consumer>
        {(states) => {
          if (states.isLogin) {
            return (<Redirect to="/" />);
          } else {
            return (
              <div className="login-page">

                <div className="top-line">
                  <label className="page-title">README</label>
                </div>

                <div className="login-box">

                  <div className="login-method">
                    <span className="method-text" style={{ float: 'left' }}>密码登录</span>
                    <span className="checkout-method" >注册</span>
                  </div>

                  <div className="input-line" >
                    <Icon type="user" className="login-icon" />
                    <input type="text" placeholder="用户名/手机/邮箱" className="login-input" onInput={this.userInput} />
                  </div>

                  <div className="input-line" >
                    <Icon type="key" className="login-icon" />
                    <input type="text" placeholder="请输入登录密码" className="login-input" onInput={this.pswInput} />
                  </div>

                  <button type="button" className="login-button" onClick={() => { states.toggleTheme(this.state.username, this.state.password) }}>登录</button>
                </div>
              </div>
            )
          }
        }
        }
      </UserContext.Consumer>
    )
  }
}
