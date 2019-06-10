import React, { Component } from 'react';
import axios from 'axios';
import connection from '../../../server';
import ArticleList from '../../../components/articleList/articleList';
import { Modal } from 'antd';

const confirm = Modal.confirm;

export default class MyArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      total: 1,
      currentPage: 1,
      changePages: (page) => {
        this.pageOnChange(page)
      },
      articleStatus: this.props.type,
      user: this.props.user,
      delete: (id) => this.deleteArticle(id),
      sendArticle: (id) => this.sendArticles(id)
    }
  }
  componentDidMount() {
    this.getArticles();
  }

  pageOnChange = (page) => {
    this.setState({
      currentPage: page,
    }, () => {
      this.getArticles();
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articleStatus: nextProps.type,
      user: nextProps.user,
    }, () => {
      this.getArticles();
    })
  }

  deleteArticle = (id) => {
    confirm({
      title: '确定删除?',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        this.trueDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  trueDelete = (id) => {
    axios.delete(`http://47.97.125.71:8080/article/${id}`).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        confirm({
          title: '删除成功',
          content: '即将刷新页面',
        });
        this.getArticles();
      }
    }).catch(res => {
      console.log(res)
    })
  }

  sendArticles = (id) => {
    confirm({
      title: '确定发布?',
      content: '发布成功后，该文章将在首页进行展示',
      cancelText: '取消',
      okText: '确认',
      onOk: () => {
        this.trueSendArticle(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  trueSendArticle = (id) => {
    axios.get(`http://47.97.125.71:8080/article/publish/${id}`).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        alert('发布成功')
        this.getArticles();
      }
    }).catch(res => {
      console.log(res.data.msg)
    })
  }



  async getArticles() {
    let pageNum = this.state.currentPage;
    let userId = this.state.user.userPO.id;
    let articleStatus = this.state.articleStatus;
    if (articleStatus === 2) {
      articleStatus = 'publish';
    } else {
      articleStatus = 'drafts';
    }
    const param = {
      data: null,
      path: `/article/${articleStatus}/${userId}/${pageNum}`,
      method: 2,
    }
    this.setState({
      articles: await connection(param),
    }, () => {
      this.setState({
        total: this.state.articles.data.total,
      })
    })
  }
  render() {
    return (
      <div>
        <ArticleList data={this.state.articles} page={this.state} type={this.props.type} />
      </div>
    )
  }
}