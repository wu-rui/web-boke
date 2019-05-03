import React, { Component } from 'react';
import './login-enroll.less'

export default class Enroll extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="pic-box">
          <img src="/image/leaf.jpg" className="list-img-banner" alt="登录页图片" />
        </div>
        <div className="login-box">
          <form className="for-login" name="input">
            <div className="title">README</div>
            <input type="text" placeholder="   请输入手机号" height="100%" className="input" />
            <div className="verify">
              <input type="text" className="verify-input" placeholder="   请输入验证码" />
              <button type="button" className="verify-button" >获取验证码</button>
            </div>
            <input type="text" placeholder="   设置密码" height="100%" className="input" />
            <input type="text" placeholder="   请再次输入密码" height="100%" className="input" />
            <button type="button" className="button" >同意条款并注册</button>
          </form>
        </div>
      </div>
    )
  }
}