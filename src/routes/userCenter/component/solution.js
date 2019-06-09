import React, { Component } from 'react';
import axios from 'axios';
import { Radio, Button, Modal, Avatar, Upload, Icon, message, DatePicker } from 'antd';
// import { Upload, Icon, message } from 'antd';
// import UserAvatar from '../../../components/avatar/userAvatar';
import connection from '../../../server';
import moment from 'moment';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM/DD';

export default class Solution extends Component {
  constructor(props) {
    super(props);
    console.log('Props1', this.props)
    this.state = {
      value: 1,
      isDisabled: true,
      data: {
        userId: null,
        name: null,
        birthday: null,
        email: null,
        phone: null,
        selfintro: null,
        sex: null,
      },
      birth: null,
      src: null,
      imgFile: null,
      isChangeImg: false,
      originData: null,
    };
  }
  componentDidMount() {
    console.log('Props2', this.props)
    this.getUserInfo(this.props.states)
  }

  // componentWillReceiveProps(nextProps) {
  //   this.getUserInfo(nextProps.states)
  // }

  getUserInfo = (result) => {
    if (result.isLogin) {
      let data = result.context;
      this.setState({
        data: {
          userId: data.userPO.id,
          name: data.userInfoPO.name,
          username: data.userPO.username,
          birthday: data.userInfoPO.birthday,
          email: data.userPO.email,
          phone: data.userPO.phone,
          selfintro: data.userInfoPO.birthday,
          sex: data.userInfoPO.sex,
        },
        birth: data.userInfoPO.birthday,
        src: data.userInfoPO.headUrl,
      }, () => {
        this.setState({
          originData: this.state.data,
        })
      })
    }
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
    confirm({
      content: '确定修改您的个人信息吗',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        this.toSaveInfo();
      },
      onCancel: () => {
        this.onCancel();
      },
    });
  }

  async toSaveInfo() {
    let data = this.state.data;
    const param = {
      data: data,
      path: '/users/update/info',
      method: 1
    }
    let result = await connection(param);
    if (result.data.code === 1) {
      this.props.states.changeUserInfo(this.state.data.userId);
      this.setState({
        isDisabled: true,
        originData: this.state.data,
      })
    } else {
      alert(result.data.msg)
    }
  }

  onCancel = () => {
    let origin = this.state.originData;
    this.setState({
      isDisabled: true,
      data: origin,
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
    })
  }

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
        <div className="update-button">
          <button onClick={this.changeImgs}>确定更换</button>
          <button onClick={this.cancleChangeImg}>取消更换</button>
        </div>
      )
    } else {
      return (
        <label htmlFor="fileElem" className="update-img">更换头像</label>
      )
    }
  }

  changeImgs = () => {
    this.setState({
      isChangeImg: false,
    })
    var fd = new FormData()
    fd.append('file', this.state.imgFile)
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(`http://47.97.125.71:8080/users/head/${this.state.data.userId}`, fd, config).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        this.props.states.changeUserInfo(this.state.data.userId);
      }
    }).catch(res => {
      console.log(res)
    })
  }

  cancleChangeImg = () => {
    this.setState({
      src: this.state.originData.src,
      imgFile: null,
      isChangeImg: false,
    })
  }

  getBirth = (userTime) => {
    if (userTime !== undefined && userTime !== null) {
      let date = new Date(userTime);
      let year = date.getFullYear();  // 获取完整的年份(4位,1970)
      let month = (date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
      let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate(); // 获取日(1-31)
      let time = date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
      let hour = date.getHours();  // 获取小时数(0-23)
      let minutes = date.getMinutes();  // 获取分钟数(0-59)
      let second = date.getSeconds();  // 获取秒数(0-59)
      return `${year}-${month}-${day}`;
    } else {
      return '2019-02-02';
    }
  }

  noPicture = (isChangeImg, src) => {
    return (
      <div style={{ display: 'inline-block' }}>
        <Avatar style={{ position: 'absolute', top: 35, left: 80, }} size={64} icon="user" />
        <span className="check-img">
          <input type="file" id="fileElem" className="check-avatar" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={this.imgCahnge} />
          {
            this.changeImg(isChangeImg)
          }
        </span>
      </div>
    )
  }
  showPIcture = (isChangeImg, src) => {
    return (
      <div style={{ display: 'inline-block' }}>
        <img className="avatar" className="head-photo" src={src} alt="头像图片" />
        <span className="check-img">
          <input type="file" id="fileElem" className="check-avatar" accept="image/gif,image/jpeg,image/jpg,image/png" onChange={this.imgCahnge} />
          {
            this.changeImg(isChangeImg)
          }
        </span>
      </div>
    )
  }
  onPanelChange = (value, mode) => {
    console.log('value', value);
    console.log('mode', mode);
    if (value !== null) {
      this.setState({
        data: {
          ...this.state.data,
          birthday: mode,
        }
      })
    }
  }
  render() {
    if (this.state.data.userId !== null) {
      return (
        <div className="solution">
          <ul>
            <li style={{ height: 150, lineHeight: '148px', position: 'relative' }}>
              <span>头像</span>
              {
                this.state.src === null ? this.noPicture(this.state.isChangeImg, this.state.src) : this.showPIcture(this.state.isChangeImg, this.state.src)
              }
              {/* <UserAvatar /> */}
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
              <span >生日</span>
              {/* {
                this.state.birth !== null ? <DatePicker className="birthday" onChange={this.onPanelChange} disabled={this.state.isDisabled} defaultValue={moment(this.getBirth(this.state.birth), dateFormat)} /> : ""
              } */}

              <DatePicker className="birthday" onChange={this.onPanelChange} disabled={this.state.isDisabled} defaultValue={moment(this.getBirth(this.state.birth), dateFormat)} />

            </li>
            {/* <li>
              <span>邮箱</span>
              <input name="email" className="text-solution" disabled={this.state.isDisabled} type="text" value={this.state.data.email} onChange={this.onInputChange} />
            </li> */}
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
    } else {
      return (
        <div />
      )
    }
  }
}



