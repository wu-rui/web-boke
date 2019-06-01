import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import HotList from '../../components/hotList/hotList';
// import { letter } from '../../mockData/data';
import ArticleList from '../../components/articleList/articleList';
import { UserContext } from '../../context';
import connection from '../../server';
import Opinion from '../../components/opinions/opinions';
import { Input } from 'antd';
import './home.less'
const Search = Input.Search;

// 现在需要做，留言功能，点赞功能，修改密码功能，还有删除功能


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

      if (this.state.articles) {
        this.setState({
          total: this.state.articles.data.total,
        })
      }
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
                  {/* 轮播图 */}
                  {/* <ControlledCarous el /> */}
                  {/* 文章列表 */}
                  {
                    this.state.articles === null ? '' : <ArticleList data={this.state.articles} page={this.state} type={1} />
                  }
                </div>
                {/* 右侧菜单列表 */}
                <div className="content-menu">
                  {/* <HotList /> */}
                  <Opinion />
                  <div className="input-search">
                    <Search
                      placeholder="请输入需要搜索的文章标题"
                      onSearch={value => console.log(value)}
                    />
                  </div>
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
