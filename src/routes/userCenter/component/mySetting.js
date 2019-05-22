import React, { Component } from 'react';
// const name = '修改密码，';
export default class Setting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuId: 1,
    }
  }

  render() {
    return (
      <div style={{ backgroundColor: 'black', width: 100, height: 100, color: 'red' }}>
        {
          this.props.userMsg.username
        }
      </div>
    )
  }
}