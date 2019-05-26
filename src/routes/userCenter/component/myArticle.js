import React, { Component } from 'react';
import connection from '../../../server';
import ArticleList from '../../../components/articleList/articleList';

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
    }
  }
  componentDidMount() {
    debugger
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
    debugger
    this.setState({
      articleStatus: nextProps.type,
    }, () => {
      this.getArticles();
    })
  }

  async getArticles() {
    debugger
    let data = {
      pageNum: this.state.currentPage,
      userId: 1,
      articleStatus: this.state.articleStatus,
    }
    const param = {
      data: data,
      path: '/article/pager',
      method: 1,
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