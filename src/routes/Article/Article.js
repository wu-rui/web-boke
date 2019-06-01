import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Modal, Button, Input } from 'antd';
import connection from '../../server';
import E from 'wangeditor'
import './article.less'

class Article extends Component {
  constructor(props, context) {
    super(props, context);
    console.log('这个context', context)
    this.state = {
      editorContent: null,
      sortId: null,
      menuList: null,
      userId: null,
      visible: false,
      confirmLoading: false,
      newSortName: null,
      title: null,
      result: null,
      isSubmit: false,
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
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.userMsg !== undefined) {
      this.setState({
        userId: nextProps.userMsg.userPO.id
      }, () => {
        this.getUserResult()
      })
    }
  }

  // 获取用户分类接口
  async getUserResult() {
    const param = {
      data: null,
      path: '/category/u/' + this.state.userId,
      method: 2
    }
    this.setState({
      menuList: await connection(param),
    })
  }

  // 保存文章接口
  async saveArticle(data) {
    const param = {
      data: data,
      path: '/article',
      method: 1
    }
    this.setState({
      result: await connection(param)
    }, () => {
      if (this.state.result.data.code === 1) {
        if (data.articleStatus === 1) {
          this.props.history.push('/center?id=3');
        } else {
          this.props.history.push('/center?id=2');
        }

      }
      // window.location.href = `http://47.97.125.71:8080/article/detail/${this.state.result.data.changeData.id}`;
    })
  }

  // 点击保存，直接发布
  clickSave = (e) => {
    let res = (e.target.id === 'save') ? 1 : 2;
    let result = true;
    let data = {
      title: this.state.title,
      userId: this.props.userMsg.userPO.id,
      categoryId: this.state.sortId,
      articleStatus: res,
      content: this.state.editorContent
    }
    for (var i in data) {
      if (result && (data[i] === null || data[i] === undefined || data[i] === '')) {
        result = false;
        switch (i) {
          case 'title':
            alert('标题不能为空');
            break;
          case 'content':
            alert('内容不能为空');
            break;
          case 'categoryId':
            alert('请选择分类');
            break;
          default:
            break;
        }
      } else {
        if (i === 'content' && data[i] === '<p><br></p>') {
          result = false;
        }
      }
    }
    if (result) {
      this.saveArticle(data)
    }
  }


  // 点击直接发布
  clickSubmit = () => {
    alert(this.state.editorContent)
  }

  // 遍历显示用户的分类
  mapArticelSort = (menuList) => {
    if (menuList !== undefined && menuList !== null) {
      if (menuList.data.data.length > 0) {
        return (
          <div>
            <Button type="primary" className="go-home">
              <Link to="/">返回首页</Link>
            </Button>
            <ul className="ul-sort-name">
              {
                menuList.data.data.map((item) => {
                  return (
                    <li key={item.id} value={item.id} onClick={this.selectSort}>{item.name}</li>
                  )
                })
              }
            </ul>
            <Button onClick={this.showModal} type="primary" className="go-home" style={{ marginTop: 10 }}>新建分类</Button>
          </div>
        )
      }
    }
  }

  // 获取用户选择的分类
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

  // 点击显示弹窗
  showModal = () => {
    this.setState({
      newSortName: '',
    }, () => {
      this.setState({
        visible: true,
      });
    })
  }

  // 确认新增分类
  handleOk = () => {
    const data = {
      name: this.state.newSortName,
      userId: this.props.userMsg.userPO.id,
    }
    this.outNewSortName(data);
    this.setState({
      confirmLoading: true,
    });
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  }

  // 新增文章分类接口
  async outNewSortName(data) {
    const param = {
      data: data,
      path: '/category',
      method: 1
    }
    await connection(param).then(() => {
      this.getUserResult()
    })
  }

  // 弹窗取消分类
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  // 实时获取用户输入的分类名称
  onSortNameChange = (e) => {
    this.setState({
      newSortName: e.target.value,
    })
  };

  // 实时获取用户输入的标题内容
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value,
    })
  };

  render() {
    return (
      <div className="write-page">
        <Button type="primary" onClick={this.clickSave} className="save" id="save">保存</Button>
        <Button type="primary" onClick={this.clickSave} className="submit" id="submit">直接发布</Button>
        <div className="write-sort">
          {
            this.mapArticelSort(this.state.menuList)
          }
          <Modal
            title="Title"
            visible={this.state.visible}
            onOk={this.handleOk}
            confirmLoading={this.state.confirmLoading}
            onCancel={this.handleCancel}
          >
            <Input id="sortName" allowClear onChange={this.onSortNameChange} placeholder="请输入分类名称" value={this.state.newSortName} />
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

export default withRouter(Article);