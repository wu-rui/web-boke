import React, { Component } from 'react';
import { Icon } from 'antd';
import './articleList.less'

export default class ArticleList extends Component {

  constructor(props) {
    super(props);
    console.log(props);

  }

  mapArticleList = (list) => {
    return list.map((item) => {
      return (
        <li className="info-li" key={item.id}>
          <div className="info-li-info">
            <p className="info-title">
              <a className="info-title" href="https://juejin.im/" target="_blank">
                {item.title}
              </a>
            </p>
            <span className="info-content user-hover">作者：{item.username}</span>
            <span className="info-content">发布于：{item.create_time}</span>
            <p className="info-recode">
              <span className="under-line remark-hover"><Icon type="message" className="remark-icon" />{item.reply}</span>
              <span className="under-line"><Icon type="like" className="like-icon" />{item.like}</span>
            </p>
          </div>
        </li>
      )
    })

  }

  render() {
    return (
      <div className="list-info">
        <ul className="info-ul">
          {this.mapArticleList(this.props.data)}
        </ul>
      </div>
    )
  }
}