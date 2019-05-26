import React, { Component } from 'react';
import { Button, Input } from 'antd';
import './opinions.less'

const { TextArea } = Input;

export default class Opinions extends Component {
  render() {
    return (
      <div className="opinion-box" >
        <p>给站长的一封信</p>
        <TextArea rows={4} placeholder="我们一起来维护这个小博客吧~" />
        <p className="opinion-submit">提交</p>
      </div>
    )
  }
}
