import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

const data = {
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
  }

  onRadioChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return (
      <div className="solution">
        <ul>
          <li style={{ height: 150, lineHeight: '148px', position: 'relative' }}>
            <span>
              头像
            </span>
            <div className="head-photo">
              {/* <Avatar size="large" icon="user" /> */}
              {/* <img src="/image/aaa.jpg" alt="avater" /> */}
            </div>
          </li>
          <li>
            <span>
              昵称
            </span>
            <div>
              <span>{data.name}</span>
            </div>
          </li>
          <li>
            <span>
              性别
            </span>
            <div>
              <RadioGroup onChange={this.onRadioChange} value={this.state.value}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            </div>
          </li>
          <li>
            <span>
              生日
            </span>
            <div>
              <span>{data.birth}</span>
            </div>
          </li>
          <li>
            <span>
              邮箱
            </span>
            <div>
              <span>{data.email}</span>
            </div>
          </li>
          <li>
            <span>
              个人简介
            </span>
            <div>
              <span>{data.selfintro}</span>
            </div>
          </li>
          <li>
            <span>
              手机
            </span>
            <div>
              <span>{data.phone}</span>
            </div>
          </li>
        </ul>

      </div>
    )
  }
}