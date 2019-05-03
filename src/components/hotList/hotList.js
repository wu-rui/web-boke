import React, { Component } from 'react';
import './hotList.less'

export default class Footer extends Component {
  render() {
    return (
      <div className="hot-list">
        <ul className="hot-ul">
          <li className="hot-li-box" style={{ backgroundColor: '#eeeeee' }}>7 日热门</li>
          <li className="hot-li-box" style={{ backgroundColor: '#ecf4f3' }}>30日热门</li>
          <li className="hot-li-box" style={{ backgroundColor: '#bfd8d5' }}>优选连载</li>
          <li className="hot-li-box" style={{ backgroundColor: '#b1bed5' }}>简书版权</li>
          <li className="hot-li-box" style={{ backgroundColor: '#929aab' }}>简书课堂</li>
        </ul>
      </div>
    )
  }
}
