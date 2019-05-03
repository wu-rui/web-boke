/*
import React, { Component } from 'react';
import './imgs.less';

let timer = null;
let newLeft = -600;

var wrap = document.getElementsByClassName('wrap')[0];
var container = document.getElementsByClassName('container')[0];
var left = document.getElementsByClassName('jt_left')[0];
var right = document.getElementsByClassName('jt_right')[0];
var dot = document.getElementsByTagName('span');
let index = 0;
let len = dot.length;

export default class Imgs extends Component {
  next = () => {
    if (newLeft == -3000) {
      newLeft = 0;
      wrap.style.left = newLeft + 'px';
    }
    newLeft -= 600;
    this.startMove(wrap, {
      "left": newLeft
    });
    index++;
    if (index === 5) {
      index = 0;
    }
    this.setCurrentDot();
  }

  prev = () => {
    if (newLeft == 0) {
      newLeft = -3000;
      wrap.style.left = newLeft + 'px';
    }
    newLeft += 600;
    this.startMove(wrap, {
      "left": newLeft
    });
    index--;
    if (index === -1) {
      index = 4;
    }
    this.setCurrentDot();
  }

  autoPlay = () => {
    timer = setInterval(function () {
      this.next();
    }, 2000)
  }

  //处理按钮
  setCurrentDot = () => {
    for (var m = 0; m < len; m++) {
      dot[m].className = '';
    }
    dot[index].className = 'on';
  }


  getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  }

  //运动框架 startMove函数
  startMove(obj, json, fn) {
    clearInterval(obj.timer);
    //开启定时器
    obj.timer = setInterval(function () {
      var flag = true;
      //遍历json
      for (var attr in json) {
        //取当前值 iCur
        var iCur = 0;
        if (attr === 'opacity') {
          iCur = Math.round(parseFloat(this.getStyle(obj, attr)) * 100);
        } else {
          iCur = parseInt(this.getStyle(obj, attr));
        }
        //算速度：iSpeed
        //目标值：json[attr]
        var iSpeed = (json[attr] - iCur) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        //检测停止
        if (iCur !== json[attr]) {
          flag = false
        }
        if (attr == 'opacity') {
          obj.style.filter = 'alpha(opacity:' + iCur + iSpeed + ')';
          obj.style.opacity = (iCur + iSpeed) / 100;
        } else {
          obj.style[attr] = iCur + iSpeed + 'px';
        }
      }
      if (flag) {
        clearInterval(obj.timer);
        if (fn) { fn(); }
      }
    }, 30)
  }


  render() {
    return (
      <div className="container" onMouseEnter={this.clearInterval(timer)} onMouseLeave={this.autoPlay}>
        <div className="wrap">
          <img src="/image/gray.jpg" alt="1" className="wrap" />
          <img src="/image/info.jpg" alt="2" />
          <img src="/image/leaf.jpg" alt="3" />
          <img src="/image/left-img.jpg" alt="4" />
          <img src="/image/sea.jpg" alt="5" />
          <img src="/image/shengzi.jpg" alt="6" />
          <img src="/image/water.jpg" alt="7" />
        </div>
        <div className="button">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
        <a href="javascript:void(0);" className="jt jt_left" onClick={this.prev}>&lt;</a>
        <a href="javascript:void(0);" className="jt jt_right" onClick={this.next}>&gt;</a>
      </div>
    )
  }
}

*/