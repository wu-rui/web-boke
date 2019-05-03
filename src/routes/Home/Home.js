import React, { Component } from 'react';
import { Redirect } from 'react-router';
// import axios from 'axios';
import HotList from '../../components/hotList/hotList'
import articles from '../../mockData/data'
import ArticleList from '../../components/articleList/articleList';
import './home.less'

export default class Home extends Component {

  /*这里需要注意后期优化在safari的private模式下
  * localS torage会返回null，导致程序错误
  */
  getLocalStorageUserMsg() {
    let userMsg = localStorage.user_msg;
    if (userMsg !== null && userMsg !== undefined && userMsg.length > 0) {
      this.setState({
        context: userMsg,
      })
    } else {
      this.setState({
        context: "暂时没有数据",
      })
    }
  }

  render() {
    let userMsg = localStorage.user_msg;
    if (userMsg !== null && userMsg !== undefined && userMsg.length > 0) {
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
            <ArticleList data={articles} />
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
  }
}