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
  src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
}

export default class Solution extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      isDisabled: true,
      data: data,
      src: data.src,
      imgFile: null,
      isChangeImg: false,
    };
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
  onInputChange = (e) => {
    const name = e.target.name;
    this.setState({
      data: {
        ...this.state.data,
        [name]: e.target.value,
      }
    }, () => {
      console.log(this.state)
    })
  };

  imgCahnge = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      let src = window.URL.createObjectURL(file);
      this.setState({
        src: src,
        imgFile: file,
        isChangeImg: true,
      })
    }
  }

  changeImg = (isChangeImg) => {
    if (isChangeImg) {
      return (
        <div>
          <button onClick={this.changeImgs}>确定更换</button>
          <button onClick={this.cancleChangeImg}>取消更换</button>
        </div>
      )
    } else {
      return (
        <label htmlFor="fileElem">更换头像</label>
      )
    }
  }

  changeImgs = () => {
    this.setState({
      isChangeImg: false,
    })
    data.src = this.state.src;
    // 这里需要每次改变一下原始的图像的链接
  }

  cancleChangeImg = () => {
    this.setState({
      src: data.src,
      imgFile: null,
      isChangeImg: false,
    })
  }

  render() {
    return (
      <div className="solution">
        <ul>
          <li style={{ height: 150, lineHeight: '148px', position: 'relative' }}>
            <span>头像</span>
            <img className="avatar" className="head-photo" src={this.state.src} alt="头像图片" />
            <span className="check-img">
              <input type="file" id="fileElem" className="check-avatar" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={this.imgCahnge} />
              {
                this.changeImg(this.state.isChangeImg)
              }
            </span>
            {this.isEdit(this.state.isDisabled)}
          </li>
          <li>
            <span>昵称</span>
            <input name="name" className="text-solution" disabled={this.state.isDisabled} type="text" onChange={this.onInputChange} value={this.state.data.name} />
          </li>
          <li>
            <span>性别</span>
            <RadioGroup name="sex" onChange={this.onInputChange} value={this.state.data.sex} disabled={this.state.isDisabled}>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RadioGroup>
          </li>
          <li>
            <span>生日</span>
            <input name="birth" className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.birth} onChange={this.onInputChange} />
          </li>
          <li>
            <span>邮箱</span>
            <input name="email" className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.email} onChange={this.onInputChange} />
          </li>
          <li>
            <span>个人简介</span>
            <input name="selfintro" className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.selfintro} onChange={this.onInputChange} />
          </li>
          <li>
            <span>手机</span>
            <input name="phone" className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.phone} onChange={this.onInputChange} />
          </li>
        </ul>
      </div>
    )
  }
} 