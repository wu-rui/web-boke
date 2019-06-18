import React, { Component } from 'react';
import { Icon } from 'antd';
import './opinionList.less';

export default class OpinionList extends Component {
  getOpinionList = (data) => {
    if (data !== undefined && data !== null && data.data.length > 0) {
      return data.data.map((item) => {
        return (
          <li key={item.id}>
            <p className="opinion-content">{item.content}</p>
            <p className="opinion-time">发表日期：{this.getTime(item.createTime)}</p>
          </li>
        )
      })
    }
  }

  getTime = (userTime) => {
    let date = new Date(userTime);
    let year = date.getFullYear();  // 获取完整的年份(4位,1970)
    let month = (date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate(); // 获取日(1-31)
    // let time = date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
    // let hour = date.getHours();  // 获取小时数(0-23)
    // let minutes = date.getMinutes();  // 获取分钟数(0-59)
    // let second = date.getSeconds();  // 获取秒数(0-59)
    return (`${year}-${month}-${day}`);
  }
  render() {
    return (
      <div className="opinion-list" >
        <p className="opinion-title"><Icon type="mail" />信箱</p>
        <ul>{this.getOpinionList(this.props.opinions)}</ul>
      </div>
    )
  }
}

