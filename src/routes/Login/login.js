import React, { Component } from 'react';
import { Icon } from 'antd';
import { UserContext } from '../../context';
import { Redirect } from 'react-router';
import './login.less'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLogin: true,
      enrollName: '',
      enrollPsw: '',
      enrollTel: '',
      enrollCheck: '',
      isHidden: 'input-hidden',
    }
  }

  // 当点击登录，判断数据是否正确
  onLogin = () => {
    let data = {};
    let username = this.state.loginName;
    let password = this.state.loginPsw;
    if (username !== '' && password === '') {
      data.username = this.state.loginName;
      data.password = this.state.loginPsw;
      this.props.toggleTheme(data);
    } else {
      return false;
    }
  }



  // 当input框开始改变
  handleInputChange = (e) => {
    const name = e.target.name;
    if (name === 'enrollTel' && e.target.value.length === 11) {
      this.setState({
        isHidden: '',
      })
    } else {
      if (name === 'enrollTel' && e.target.value.length !== 11) {
        if (this.state.isHidden === '') {
          this.setState({
            isHidden: 'input-hidden',
          })
        }
      }
    }
    this.setState({
      [name]: e.target.value,
    })
  }

  // 展示input框
  showPage = (states) => {
    if (this.state.isLogin) {
      return (
        // 登录框
        <div className="login-box">
          <div className="login-method">
            <span className="method-text" style={{ float: 'left' }}>密码登录</span>
            <span className="checkout-method" onClick={() => this.inEnroll(this.state.isLogin)}><span style={{ color: 'gray', fontSize: 15 }}>没有账号?  </span>注册</span>
          </div>
          <div className="input-line" >
            <Icon type="user" className="login-icon" />
            <input name="username" type="text" autoFocus placeholder="用户名/手机/邮箱" className="login-input" onChange={this.handleInputChange} value={this.state.username} />
          </div>
          <div className="input-line" >
            <Icon type="key" className="login-icon" />
            <input name="password" type="password" placeholder="请输入登录密码" className="login-input" onChange={this.handleInputChange} value={this.state.password} />
          </div>
          <button type="button" className="login-button" onClick={() => { states.toggleTheme(this.state.username, this.state.password, 1) }}>登录</button>
        </div>
      )
    } else {
      return (
        // 注册框
        <div className="login-box">
          <div className="login-method">
            <span className="method-text" style={{ float: 'left' }}>用户注册</span>
            <span className="checkout-method" onClick={() => this.inEnroll(this.state.isLogin)}><span style={{ color: 'gray', fontSize: 15 }}>已有账号?  </span>登录</span>
          </div>
          <div className="input-line" >
            <Icon type="user" className="login-icon" />
            <input name="enrollName" type="text" autoFocus placeholder="请输入用户名" className="login-input" onChange={this.handleInputChange} value={this.state.enrollName} />
          </div>
          <div className="input-line" >
            <Icon type="key" className="login-icon" />
            <input name="enrollPsw" type="password" placeholder="请输入登录密码" className="login-input" onChange={this.handleInputChange} value={this.state.enrollPsw} />
          </div>
          <button type="button" className="login-button" onClick={() => { states.toggleTheme(this.state.enrollName, this.state.enrollPsw, 2) }}>注册</button>
        </div>
      )
    }
  }

  // 当点击注册按钮
  // getEnroll = () => {
  //   alert(`注册名字：${this.state.enrollName},注册密码：${this.state.enrollPsw}`)
  // }

  // 当切换登录方式
  inEnroll = (check) => {
    this.setState({
      username: '',
      password: '',
      enrollName: '',
      enrollPsw: '',
      enrollTel: '',
      enrollCheck: '',
    }, () => {
      this.setState({
        isLogin: !check
      })
    })
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
                  <label className="page-title">小博客</label>
                </div>
                {this.showPage(states)}
              </div>
            )
          }
        }}
      </UserContext.Consumer>
    )
  }
}


{/* <div className="input-line" >
            <Icon type="phone" className="login-icon" />
            <input name="enrollTel" type="text" maxLength={11} placeholder="请输入手机号" className="login-input" onChange={this.handleInputChange} value={this.state.enrollTel} />
          </div>
          <div className={`input-line ${this.state.isHidden}`} >
            <Icon type="message" className="login-icon" />
            <input name="enrollCheck" type="text" placeholder="请输入验证码" className="login-input" onChange={this.handleInputChange} value={this.state.enrollCheck} />
            <span className="get-check">获取验证码</span>
          </div> */}
