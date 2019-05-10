import React, { Component } from 'react';
import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;
let data = {
  name: '西西呀',
  birth: '2019-11-12',
  email: '174749006@qq.com',
  phone: '18685660952',
  selfintro: '账号，昵称，个人简介，性别，头像，生日，邮件，手机',
  sex: 2,
}

export default class Solution extends Component {

  state = {
    value: 1,
    isDisabled: true,
    data: data,
  }

  onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  isEdit = (isEdit) => {
    if (isEdit) {
      return (
        <Button className="edit-solution" onClick={() => { this.setState({ isDisabled: false }) }} >编辑</Button>
      )
    } else {
      return (
        <div style={{ display: 'inline' }}>
          <Button className="edit-solution" onClick={this.onCancel}>取消</Button>
          <Button className="edit-solution" onClick={this.onSaveEdit} >保存</Button>
        </div>
      )
    }
  }
  onSaveEdit = () => {
    data = this.state.data;
    this.setState({
      isDisabled: true,
      data,
    })
  }
  onCancel = () => {
    this.setState({
      isDisabled: true,
      data: data,
    })
  }
  // 当用户名改变的时候
  onNameChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        name: e.target.value,
      }
    })
  };
  onBirthChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        birth: e.target.value,
      }
    })
  };
  onPhoneChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        phone: e.target.value,
      }
    })
  };
  onEmailChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        email: e.target.value,
      }
    })
  };
  onIntroChange = (e) => {
    this.setState({
      data: {
        ...this.state.data,
        selfintro: e.target.value,
      }
    })
  };

  render() {
    return (
      <div className="solution">
        <ul>
          <li style={{ height: 150, lineHeight: '148px', position: 'relative' }}>
            <span>头像</span>
            <img src="/image/aaa.jpg" alt="avater" className="head-photo" />
            {this.isEdit(this.state.isDisabled)}
          </li>
          <li>
            <span>昵称</span>
            <input className="text-solution" disabled={this.state.isDisabled} type="text" onChange={this.onNameChange} value={this.state.data.name} />
          </li>
          <li>
            <span>性别</span>
            <RadioGroup onChange={this.onRadioChange} value={this.state.data.sex} disabled={this.state.isDisabled}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          </li>
          <li>
            <span>生日</span>
            <input className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.birth} onChange={this.onBirthChange} />
          </li>
          <li>
            <span>邮箱</span>
            <input className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.email} onChange={this.onEmailChange} />
          </li>
          <li>
            <span>个人简介</span>
            <input className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.selfintro} onChange={this.onIntroChange} />
          </li>
          <li>
            <span>手机</span>
            <input className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.phone} onChange={this.onPhoneChange} />
          </li>
        </ul>
      </div>
    )
  }
}