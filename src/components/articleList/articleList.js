import React, { Component } from 'react';
import { Icon, Pagination, Button } from 'antd';
import './articleList.less';

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: this.props.page.currentPage,
      total: this.props.page.total,
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      current: nextprops.page.currentPage,
      total: nextprops.data.data.total,
    })
  }


  // 这里type为1 ，是首页的样式，为2是个人中心的已发布，为3是个人中心的草稿箱
  mapArticleList = (list, type) => {
    if (list !== undefined && list !== null && list.data.total > 0) {
      return list.data.data.map((item) => {
        if (type === 0 || type === 1) {
          return (
            <li className="info-li" key={item.id}>
              <div className="info-li-info">
                <p className="info-title">
                  <a href={`http://47.97.125.71:8080/article/detail/${item.id}`} target="_blank">
                    {item.title}
                  </a>
                </p>
                <span className="info-content user-hover">作者：{item.username}</span>
                <span className="info-content">发布于：{this.getTime(item.publishTime)}</span>
                <p className="info-recode">
                  <span className="under-line remark-hover"><Icon type="message" className="remark-icon" />{item.reply}</span>
                  <span className="under-line"><Icon type="like" className="like-icon" />{item.like}</span>
                  {
                    (type === 0) ? '' : <Button>删除</Button>
                  }
                </p>
              </div>
            </li>
          )
        } else {
          return (
            <li className="info-li" key={item.id}>
              <div className="info-li-info">
                <p className="info-title">
                  <a href={`http://47.97.125.71:8080/article/detail/${item.id}`} target="_blank">
                    {item.title}
                  </a>
                </p>
                <span className="info-content user-hover">作者：{item.username}</span>
                <span className="info-content">发布于：{this.getTime(item.publishTime)}</span>
                <p className="drafts">
                  <span >状态：未发布    </span>
                  <Button>继续编辑</Button>
                  <Button>直接发布</Button>
                </p>
              </div>
            </li>
          )
        }
      })
    }
  }

  getTime = (create_time) => {
    let date = new Date(create_time);
    let year = date.getFullYear();  // 获取完整的年份(4位,1970)
    let month = (date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let day = date.getDate();  // 获取日(1-31)
    let time = date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
    let hour = date.getHours();  // 获取小时数(0-23)
    let minutes = date.getMinutes();  // 获取分钟数(0-59)
    let second = date.getSeconds();  // 获取秒数(0-59)
    return (`${year}-${month}-${day}`);
  }
  render() {
    return (
      <div className="list-info">
        <ul className="info-ul">
          {
            this.mapArticleList(this.props.data, this.props.type)
          }
        </ul>
        <Pagination current={this.state.current} onChange={this.props.page.changePages} total={this.state.total} pageSize={20} />
      </div>
    )
  }
}



// articleStatus: 2
// categoryId: 2
// content: null
// contentFileUrl: null
// createTime: null
// deleted: null
// id: 98859182924846930
// pageUrl: null
// praisePoint: 0
// publishTime: 1558344248469
// readNumber: 0
// title: "这是一篇基于大数据的文章"
// updateTime: null
// userId: null