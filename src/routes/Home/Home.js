import React, { Component } from 'react';
import { Redirect } from 'react-router';
import HotList from '../../components/hotList/hotList';
// import articles from '../../mockData/data';
import ArticleList from '../../components/articleList/articleList';
import { UserContext } from '../../context';
import connection from '../../server';

import './home.less'
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      currentPage: 1,
      total: 1,
      changePages: (page) => {
        this.pageOnChange(page)
      },
    }
  }

  pageOnChange = (page) => {
    this.setState({
      currentPage: page,
    }, () => {
      this.getArticles();
    })
  }

  componentDidMount() {
    this.getArticles();
  }

  async getArticles() {
    const param = {
      data: null,
      path: `/article/new_article/${this.state.currentPage}`,
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
      <UserContext.Consumer>
        {(states) => {
          if (states.isLogin) {
            return (
              <div className="main-content">
                {/* 内容列表 */}
                <div className="content-list">
                  {/* <Imgs /> */}
                  {/* 照片 */}
                  <div className="list-img">
                    <img src="/image/sea.jpg" className="list-img-banner" alt="首页轮播图照片" />
                  </div>
                  {/* 文章列表 */}
                  <ArticleList data={this.state.articles} page={this.state} />
                </div>
                {/* 右侧菜单列表 */}
                <div className="content-menu">
                  <HotList />
                </div>
              </div>
            )
          } else {
            return (<Redirect to="/login" />);
          }
        }}
      </UserContext.Consumer>
    )
  }
}
