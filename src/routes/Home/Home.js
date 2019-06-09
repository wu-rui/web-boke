import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import HotList from '../../components/hotList/hotList';
// import { letter } from '../../mockData/data';
import ArticleList from '../../components/articleList/articleList';
// import ControlledCarous from '../../components/carousel/carousel';
import { UserContext } from '../../context';
import connection from '../../server';
import Opinion from '../../components/opinions/opinions';
import OpinionList from '../../components/opinionList/opinionList';
import { Input, Modal } from 'antd';
import './home.less'
const Search = Input.Search;
const confirm = Modal.confirm;

// 现在需要做，留言功能，点赞功能，修改密码功能，还有删除功能


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      opinions: null,
      currentPage: 1,
      total: 1,
      changePages: (page) => {
        this.pageOnChange(page)
      },
      opinionTextValue: '',
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
    this.getOpinions();
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
  async getOpinions() {
    const param = {
      data: null,
      path: '/option/lists',
      method: 2,
    }
    this.setState({
      opinions: await connection(param),
    })
  }

  async sendLetter(value) {
    let data = {
      content: value,
    }
    if (value) {
      const param = {
        data: data,
        path: '/option',
        method: 1
      }
      let res = await connection(param);
      if (res.data.code === 1) {
        confirm({
          title: '提交成功',
          content: res.data.msg,
          cancelText: '取消',
          okText: '确认',
          onOk: () => {
            this.setState({
              opinionTextValue: '',
            })
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        this.getOpinions();
      }
    }
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
                    this.state.articles === null ? '' : <ArticleList data={this.state.articles} page={this.state} id={states.context.userPO.id} type={1} />
                  }
                </div>
                {/* 右侧菜单列表 */}
                <div className="content-menu">
                  {/* <HotList /> */}
                  <Opinion sendLetters={(value) => this.sendLetter(value)} value={this.state.opinionTextValue} />
                  <OpinionList opinions={this.state.opinions} />
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
