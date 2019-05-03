import React, { Component } from 'react';
import './footer.less'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-line" />
        <div className="line-text">
          <span className="footer-text">关于我们</span>
          <span className="footer-text">法律声明及隐私权政策</span>
          <span className="footer-text">用户反馈</span>
          <span className="footer-text">联系我们</span>
          <span className="footer-text">加入我们</span>
        </div>
      </div>
    )
  }
}