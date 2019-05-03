import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Modal, Button, Input } from 'antd';
import connection from '../../server';

import E from 'wangeditor'
import './article.less'

export default class Article extends Component {
  constructor(props, context) {
    super(props, context);
    console.log('这里的props', props.userMsg)
    this.state = {
      editorContent: '',
      sortId: '',
      menuList: [],
      userId: null,
      visible: false,
      confirmLoading: false,
      newSortName: null,
      title: null,
    }
  }
  componentDidMount() {
    const editor = new E(this.editorElemTop, this.editorElemContnet)
    // 设置为100是因为这个页面有弹窗，而其便器的默认值是10000，需要改变其值大小
    editor.customConfig.zIndex = 100
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create();
    console.log('localStorage', localStorage.user_msg);
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    this.setState({
      userId: nextProps.userMsg.id
    }, () => {
      this.getUserResult();
    })

  }

  async getUserResult() {
    const param = {
      data: null,
      path: '/category/u/' + this.state.userId,
      method: 2
    }
    this.setState({
      menuList: await connection(param)
    })
  }

  clickHandle() {
    alert(this.state.editorContent)
  }

  mapArticelSort = (menuList) => {
    if (menuList) {
      return (
        <ul className="ul-sort-name">
          {
            menuList.map((item) => {
              return (
                <li key={item.id} value={item.id} onClick={this.selectSort}>{item.name}</li>
              )
            })
          }
        </ul>
      )
    }
  }

  selectSort = (e) => {
    let selectSort = e.target;
    let id = selectSort.value;
    let list = selectSort.parentNode.childNodes;
    for (let i = 0; i < list.length; i++) {
      list[i].className = '';
    }
    selectSort.className = 'sort-name';
    this.setState({
      sortId: id,
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
      newSortName: null,
    });
  }

  handleOk = () => {
    const data = {
      name: this.state.newSortName,
      userId: this.props.userMsg.id,
    }
    this.outNewSortName(data);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  async outNewSortName(data) {
    const param = {
      data: data,
      path: '/category',
      method: 1
    }
    await connection(param).then(() => {
      this.getUserResult();
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  onSortNameChange = (e) => {
    this.setState({
      newSortName: e.target.value,
    })
    console.log(e.target.value);
  };
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
    console.log(e.target.value);
  };

  render() {
    return (
      <div className="write-page">
        <Button type="primary" onClick={this.clickHandle.bind(this)} className="save">保存</Button>
        <Button type="primary" onClick={this.clickHandle.bind(this)} className="submit">直接发布</Button>
        <div className="write-sort">
          <Button type="primary" className="go-home">
            <Link to="/">返回首页</Link>
          </Button>
          {
            this.mapArticelSort(this.state.menuList)
          }
          <Button onClick={this.showModal} type="primary" className="go-home" style={{ marginTop: 10 }}>新建分类</Button>
          <Modal
            title="Title"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          >
            <Input placeholder="请输入分类名称" allowClear onChange={this.onSortNameChange} />
          </Modal>
        </div>
        {/* 将生成编辑器 */}
        <div className="write-editor">
          {/* <div> */}
          <input placeholder="无标题文章" className="write-title" onChange={this.onTitleChange} />
          {/* </div> */}
          <div ref={el => this.editorElemTop = el} style={{ textAlign: 'left' }} className="editor-top" />
          <div ref={el => this.editorElemContnet = el} style={{ textAlign: 'left' }} className="editor-content" />
        </div>
      </div>
    );
  }
}
