import React, { Component } from 'react';
import './enroll.less'

export default class Resource extends Component {
  render() {
    return (
      <div className="body-box">
        <form className="toenroll" name="input">
          <div className="title">欢迎注册 DEMO</div>
          <input type="text" placeholder="   请输入手机号" height="100%" className="input" />
          <div className="verify">
            <input type="text" className="verify-input" placeholder="   请输入验证码" />
            <button type="button" className="verify-button" onmouseover="this.style.backgroundColor='black';" onmousemove="this.style.backgroundColor='';" onmouseup="this.style.backgroundColor='black';" onmousedown="this.style.backgroundColor=''">获取验证码</button>
          </div>
          <input type="text" placeholder="   设置密码" height="100%" className="input" />
          <input type="text" placeholder="   请再次输入密码" height="100%" className="input" />
          <button type="button" className="button" onmouseover="this.style.backgroundColor='black';" onmousemove="this.style.backgroundColor='';" onmouseup="this.style.backgroundColor='black';" onmousedown="this.style.backgroundColor='';">同意条款并注册</button>
        </form>
      </div>
    )
  }
}