import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { Input, Button } from 'antd';
// import connection from '../../../server';
// import { Modal } from 'antd';
// const confirm = Modal.confirm;


export default class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.user.userPO.id,
      userName: null,
      oldPsw: null,
      newPsw: null,
      turePsw: null,
      isClick: true,
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    })
  }

  // async onClickUpdate(res) {
  //   if (res.newPsw === res.turePsw) {
  //     let data = {
  //       userId: res.userId,
  //       oldPassword: res.oldPsw,
  //       newPassword: res.newPsw,
  //     }
  //     const param = {
  //       data: data,
  //       path: '/users/update/pwd',
  //       method: 1
  //     }
  //     let result = await connection(param);
  //     if (result.data.code === 1) {
  //       confirm({
  //         title: '密码修改成功',
  //         content: '密码修改成功，点击确定重新登录',
  //         footer: '确定',
  //       });
  //       localStorage.removeItem('user_msg');
  //       this.setState({
  //         userId: null,
  //       })
  //     } else {
  //       alert(result.data.msg);
  //     }
  //   } else {
  //     alert('前后密码不一致，请确认新的密码是否输入正确');
  //   }
  // }

  render() {
    return (
      <div className="password">
        <Input name="userName" placeholder="请输入用户名" allowClear onChange={this.onChange} />
        <Input.Password name="oldPsw" allowClear placeholder="请输入旧的密码" onChange={this.onChange} />
        <Input.Password name="newPsw" oldPswallowClear placeholder="请输入新的密码" onChange={this.onChange} />
        <Input.Password name="turePsw" allowClear placeholder="请确认新的密码" onChange={this.onChange} />
        <Button style={{ width: 260 }} onClick={() => this.props.updatePsw(this.state)}>确定修改</Button>
      </div>
    )
  }
}
