import React, { Component } from 'react';
import { Icon, Pagination, Button, Avatar } from 'antd';
import './articleList.less';

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: this.props.page.currentPage,
      total: this.props.page.total ? this.props.page.total : 1,
      list: this.props.data,
      type: this.props.type,
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      current: nextprops.page.currentPage,
      total: nextprops.data.data.total,
      list: nextprops.data,
      type: nextprops.type,
    })
  }

  // 删除功能，需要完善修改密码，修改个人信息，头像显示，和注册
  // 这里type为1 ，是首页的样式，为2是个人中心的已发布，为3是个人中心的草稿箱
  mapArticleList = (list, type) => {

    if (list !== undefined && list !== null && list.data.total > 0) {
      return list.data.data.map((item) => {
        if (type === 1 || type === 2) {

          return (
            <li className="info-li" key={item.id} value={item.id}>
              <div className="info-li-info">
                <p className="info-title">
                  <a href={`http://47.97.125.71:8080/article/detail/${item.id}`} target="_blank">
                    {item.title}
                  </a>
                </p>
                {
                  type === 2 ? '' : <span className="info-content user-hover"><Avatar icon="user" src={item.headUrl} />{item.username}</span>
                }
                <span className="info-content">发布于：{this.getTime(item.publishTime)}</span>
                <p className="info-recode">
                  <span className="under-line remark-hover"><Icon type="message" className="remark-icon" />{item.commontNum}</span>
                  <span className="under-line"><Icon type="like" className="like-icon" />{item.praisePoint}</span>
                  <span className="under-line"><Icon type="read" className="like-icon" />{item.readNumber}</span>
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
                {/* <span className="info-content user-hover"><Avatar icon="user" src={item.headUrl} />{item.username}</span>                <span className="info-content">发布于：{this.getTime(item.publishTime)}</span> */}
                <p className="drafts">
                  <span >状态：未发布    </span>
                  <Button>继续编辑</Button>
                  <Button>直接发布</Button>
                  <Button onClick={() => this.props.page.delete(item.id)} >删除</Button>
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
            this.mapArticleList(this.state.list, this.state.type)
          }
        </ul>
        <Pagination hideOnSinglePage current={this.state.current} onChange={this.props.page.changePages} total={this.state.total} pageSize={20} />
      </div>
    )
  }
}
