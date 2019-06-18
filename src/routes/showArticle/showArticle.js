import React, { Component } from 'react';
// import { content } from "../../mockData/data";
import hljs from 'highlight.js';
import connection from '../../server';
import { Avatar, Input, Button } from 'antd';
import './showArticle.less';
import 'highlight.js/styles/github.css';
const { TextArea } = Input;


export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: null,
      detail: null,
      comment: null,
      userId: null,
      articleId: null,
      textValue: null,
      type: null,
    }
  }

  componentDidMount() {
    this.getIds();
    // hljs.initHighlighting()();

  }

  getIds = () => {
    let search = window.location.search;
    let articleId = search.split('&')[0].split('=')[1];
    let userId = search.split('&')[1].split('=')[1];
    let type = search.split('&')[2].split('=')[1];
    this.setState({
      userId: userId,
      articleId: articleId,
      type: type,
    })
    if (articleId !== null && articleId !== '') {
      this.getArticles(articleId);
      this.getArticlesContent(articleId);
      this.getArticlesComment(articleId)
    }
  }

  async getArticles(articleId) {
    const param = {
      data: null,
      path: `/article/info/${articleId}`,
      method: 2,
    }
    this.setState({
      articles: await connection(param),
    })
  }
  async getArticlesContent(articleId) {
    const param = {
      data: null,
      path: `/article/detail/${articleId}`,
      method: 2,
    }
    this.setState({
      detail: await connection(param),
    })
  }
  async getArticlesComment(articleId) {
    const param = {
      data: null,
      path: `/comment/${articleId}`,
      method: 2,
    }
    this.setState({
      comment: await connection(param),
    })
  }

  async newArticlesComment(data) {
    const param = {
      data: data,
      path: `/comment`,
      method: 1,
    }
    let result = await connection(param)
    if (result && result.data.code === 1) {
      this.setState({
        textValue: '',
      })
      this.getArticles(this.state.article)
      this.getArticlesComment(this.state.articleId);
    } else {
      alert(result.data.msg)
    }
  }

  showContent = (content) => {
    if (content !== null && content !== undefined) {
      return (
        <div className="article-content" dangerouslySetInnerHTML={{ __html: content.data }} ></div>
      )
    }
  }

  getArticleInfo = (info, type) => {
    if (info !== null && info !== undefined) {
      let data = info.data.article_info;
      let count = info.data;
      return (
        <div className="content-head">
          <p className="article-title">{data.title}</p>
          <div className="about-author">
            {/* <a href="index.html" className="author-link"> */}
            {
              data.headUrl === null ? <Avatar style={{ margin: 5 }} size={40} icon="user" /> : <img src={data.headUrl} className="author-img" alt="info" />
            }
            {/* </a> */}
            <p className="author-detail">
              <span>作者:</span>
              <span className="author-msg">
                <a href="index.html" className="author-name">{data.username}</a>
              </span>
              {
                type === '1' ? <span>发表于:</span> : <span>保存于:</span>
              }
              <span className="author-msg">{this.getTime(data.publishTime)}</span>
              {
                type === '1' ?
                  <span>
                    <span>阅读:</span>
                    <span className="author-msg">{count.read_num}</span>
                    <span>喜欢:</span>
                    <span className="author-msg">{count.like_num}</span>
                    <span>评论:</span>
                    <span className="author-msg">{count.commont_num}</span>
                  </span> :
                  ''
              }
            </p>
          </div>
        </div>
      )
    }
  }

  getTime = (create_time) => {
    let date = new Date(create_time);
    let year = date.getFullYear();  // 获取完整的年份(4位,1970)
    let month = (date.getMonth() < 10) ? `0${date.getMonth() + 1}` : date.getMonth();  // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate(); // 获取日(1-31)
    // let time = date.getTime();  // 获取时间(从1970.1.1开始的毫秒数)
    // let hour = date.getHours();  // 获取小时数(0-23)
    // let minutes = date.getMinutes();  // 获取分钟数(0-59)
    // let second = date.getSeconds();  // 获取秒数(0-59)
    return (`${year}-${month}-${day}`);
  }

  getComment = (comment, type) => {
    if (type === '1') {
      if (comment !== null && comment !== undefined) {
        let data = comment.data;
        return (
          <div style={{ textAlign: 'left' }}>
            <p className="review-total">{data.length}条评论</p>
            <ul className="review-ul">
              {
                data.map((item) => {
                  return (
                    <li className="review-li">
                      <div className="review-box">
                        <div className="about-author">
                          {/* <a href="index.html" className="author-link"> */}
                          {/* <img src="img/info.jpg" className="author-img" alt="评论" /> */}
                          {
                            item.headUrl === undefined ? <Avatar style={{ margin: 5 }} size={40} icon="user" /> : <img src={data.headUrl} className="author-img" alt="info" />
                          }
                          {/* </a> */}
                          <p className="author-detail">
                            <span>作者:</span>
                            <span className="author-msg">
                              <a href="index.html" className="author-name">{item.userId}</a>
                            </span>
                            <span>发表于:</span>
                            <span className="author-msg">{this.getTime(item.commentTime)}</span>
                          </p>
                        </div>
                        <div>
                          <p className="comment-content" >{item.content}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    } else {
      return '';
    }
  }

  textOnChange = (e) => {
    this.setState({
      textValue: e.target.value
    })
  }

  sendOpinion = (text) => {
    if (text !== null && text !== '' && text !== undefined) {
      let data = {
        userId: this.state.userId,
        articleId: this.state.articleId,
        content: text,
      }
      this.newArticlesComment(data)
    }
  }
  render() {
    return (
      <div id="show-article">
        <div className="content-wrap">
          {
            this.getArticleInfo(this.state.articles, this.state.type)
          }
          {/* 内容插入 */}
          <div className="content-msg">
            {this.showContent(this.state.detail)}
          </div>
          {
            this.state.type === '1' ? <div className="review">
              <TextArea className="text-area" maxLength={200} rows={4} value={this.state.textValue} placeholder="请填写您的意见~(最多输入200字)" onChange={this.textOnChange} />
              <p>
                <Button style={{ marginTop: 10, }} type="primary" onClick={() => this.sendOpinion(this.state.textValue)}>提交</Button>
              </p>
              {
                this.getComment(this.state.comment, this.state.type)
              }
            </div> : ''
          }

        </div>
      </div>
    )
  }
}
