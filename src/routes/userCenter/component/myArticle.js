import React, { Component } from 'react';

import ArticleList from '../../../components/articleList/articleList';


export default class MyArticle extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <ArticleList data={this.props.data} />
      </div>
    )
  }

}