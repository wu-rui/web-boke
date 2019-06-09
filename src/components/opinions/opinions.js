import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import './opinions.less'

const { TextArea } = Input;

export default class Opinions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    }
  }
  textOnChange = (e) => {
    console.log('textArea', e.target.value)
    this.setState({
      value: e.target.value
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    })
  }
  //

  render() {
    return (
      <div className="opinion-box" >
        <p>给站长的一封信 <Icon type="edit" /></p>
        <TextArea style={{ height: 168 }} maxLength={200} rows={4} value={this.state.value} placeholder="我们一起来维护这个小博客吧~(最多输入200字)" onChange={this.textOnChange} />
        <p className="opinion-submit" onClick={() => this.props.sendLetters(this.state.value)}>提交</p>
      </div>
    )
  }
}
