import React, { Component } from 'react';

import './carousels.less'

// 参数都是必选项，没有默认设置
const data = {
  width: 800,
  height: 500,
  isAutoPlay: true,
  isHasButton: true,
  isHasSelect: true,
  imgs: [
    '/image/sea.jpg',
    '/image/info.jpg',
    '/image/sea.jpg',
    '/image/sunny.jpg',
  ]
}


export default class Carousels extends Component {

  constructor(props) {
    this.state = {
      imgs: data.imgs,
      width: data.width,
      height: data.height,
      isAutoPlay: data.isAutoPlay,
      isHasButton: data.isHasButton,
      isHasSelect: data.isHasSelect,
    }
  }


  componentDidMount() {

  }

  addImgs = () => {

  }

  addButtons = () => {

  }


  addSelects = () => {

  }

  autoPlay = () => {

  }

  moveLeft = () => {

  }

  moveRight = () => {

  }
  render() {
    return (
      <div />
    )
  }
}