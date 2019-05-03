import React, { Component } from 'react';
import './login-enroll.less'

export default class Login extends Component {
  render() {
    return (
      <div className="login-page">
        <div className="pic-box">
          <img src="/image/login.jpg" className="list-img-banner" alt="登录页图片" />
        </div>
      </div>
      // <div className="login-box">
      //   <form className="for-login" name="input">
      //     <div className="title">README</div>
      //     <input type="text" placeholder="   会员名" height="100%" className="input" />
      //     <input type="text" placeholder="   密码" height="100%" className="input" />
      //     <button type="button" className="button">同意条款并注册</button>
      //     <div className="other-way">
      //       <span className="text">第三方账号登录</span>
      //     </div>
      //   </form>
      // </div>
      // </div >
    )
  }
}