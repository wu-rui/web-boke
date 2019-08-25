import React, { Component } from 'react';

import './carousels.less'

// 参数都是必选项，没有默认设置
const data = {
  width: 640,
  height: 274,
  isAutoPlay: true,
  isHasButton: true,
  isHasSelect: true,
  imgs: [
    '/image/sea.jpg',
    '/image/info.jpg',
    '/image/green.jpg',
    '/image/sunny.jpg',
    "/image/pink.jpg"
  ]
}


export default class Swiper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imgs: data.imgs,
      size: data.imgs.length,
      curIdx: 0,
      width: data.width,
      height: data.height,
      isAutoPlay: data.isAutoPlay,
      isHasButton: data.isHasButton,
      isHasSelect: data.isHasSelect,
    }
  }

  // 添加照片
  addImgs = () => {
    const width = this.state.width
    const height = this.state.height
    let imgs = this.state.imgs.slice()
    const last = imgs[imgs.length - 1]
    imgs.unshift(last)
    imgs.push(imgs[0])
    const imgsWidth = Number(width * (imgs.length))
    return (
      <div className="swiper-imgs" style={{ width: imgsWidth, marginLeft: -width, }} >
        {
          imgs.map((it, idx) => < img src={it} alt="" key={it + idx} style={{ width: width, height: height }} />)
        }
      </div>
    )
  }
  // 添加按钮
  addButtons = () => {
    const width = this.state.width
    const height = this.state.height
    const top = height / 2 - 25;
    return (
      <div style={{ width: width, height: height, top: top }} className="imgs-buttons">
        <div className="show-button" onClick={this.moveLeft} style={{ float: 'left' }}>{`<`}</div>
        <div className="show-button" onClick={this.moveRight} style={{ float: 'right' }}>{`>`}</div>
      </div >
    )
  }

  showButton = () => {
    if (this.state.isHasButton) {
      let buttons = document.querySelector('.imgs-buttons')
      buttons.style.display = 'block'
    }
  }
  hideButton = () => {
    if (this.state.isHasButton) {
      let buttons = document.querySelector('.imgs-buttons')
      buttons.style.display = 'none'
    }
  }
  // 添加选择器
  addSelects = () => {
    return (
      <div className="select-box">
        {
          this.state.imgs.map((it, idx) => {
            let isselected = this.state.curIdx === idx ? 'isselected' : ''
            return <div onClick={this.changeSelect} className={`each-select ${isselected}`} />
          })
        }
      </div>
    )
  }
  // 选择点击事件
  changeSelect = () => {

  }
  // 自动播放,默认向右滚动
  autoPlay = () => {

  }
  // 向左移动,必须要移动元素
  moveLeft = () => {

  }
  // 向右边移动，这里可以直接滑动，到底部就
  moveRight = () => {

  }

  render() {
    return (
      <div id="swiper" onMouseEnter={this.showButton} onMouseLeave={this.hideButton} className="swiper" style={{ width: data.width, height: data.height }}>
        {this.addImgs()}
        {this.state.isHasButton ? this.addButtons() : ''}
        {this.state.isHasSelect ? this.addSelects() : ''}
      </div >
    )
  }
}