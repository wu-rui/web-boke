import React, { Component } from 'react';
import { Modal } from 'antd';
const confirm = Modal.confirm;
let snakeArray = null;
let isGoon = null;

// 注意蛇的位置一定要从头到尾存放
export default class SnakeGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: 18,
      snakeHead: [3, 10],
      apple: [6, 8],
      snakes: [[3, 10], [3, 9], [3, 8]],
      preDeriction: 1,
      isAuto: false,
    }
    snakeArray = [...Array(this.state.size)].map(_ => [...Array(this.state.size)].map(_ => 0))
    window.onkeydown = this.keyDown
  }

  // 鼠标点击
  keyDown = (e) => {
    e.preventDefault();
    let key = e.key;
    switch (key) {
      case 'ArrowUp':
        key = 0;
        break;
      case 'ArrowDown':
        key = 2;
        break;
      case 'ArrowLeft':
        key = 3;
        break;
      case 'ArrowRight':
        key = 1;
        break;
      default:
        key = null;
        break;
    }
    this.isAutoMove(key)
  }


  // 鼠标点击后清除timeout。因为在上面的keydown里面，
  // this是window的this，所以这里抽离出来处理
  isAutoMove = (key) => {
    if (key !== null) {
      // 每次点击键盘就需要更新key，是否自动设置为false
      this.setState({
        isAuto: false,
      })
      // 同时也需要清除timeout
      window.clearTimeout(isGoon)
      this.snakesChange(key)
    }
  }


  // 移动事件
  snakesChange = (key) => {
    let isEat = false;//是否吃到苹果
    let states = this.state
    let cursnakes = states.snakes;//存储初始值
    let cursnakeHead = states.snakeHead;
    let nextApple = states.apple//如果吃到苹果，该值为下一个苹果的位置
    let curDeriction = states.preDeriction;
    let setStates = () => {
      // 吃到苹果了
      if (cursnakeHead[0] === nextApple[0] && cursnakeHead[1] === nextApple[1]) {
        // 得到新的位置正确的苹果的坐标
        nextApple = this.getNewApple(0)
        isEat = true;
      } else if (cursnakeHead[0] === -1 || cursnakeHead[0] === states.size) {
        // 撞到墙
        this.loseGameModal()
        return
      } else if (cursnakeHead[1] === states.size || cursnakeHead[1] === -1) {
        // 撞到墙
        this.loseGameModal()
        return
      } else if (snakeArray && snakeArray[cursnakeHead[0]][cursnakeHead[1]] === 2) {
        // 撞到身体的
        this.loseGameModal()
        return
      } else {
        let last = cursnakes.pop();
        snakeArray[last[0]][last[1]] = 0;
      }
      cursnakes.unshift(cursnakeHead)
      this.setState({
        snakeHead: cursnakeHead,
        snakes: cursnakes,
        apple: isEat ? nextApple : states.apple,
        preDeriction: curDeriction,
        isAuto: true,
      })
    }
    switch (key) {
      case 0:
        // 当前是上下的方向就不能有反应
        if (curDeriction !== 2) {
          cursnakeHead = [cursnakeHead[0] - 1, cursnakeHead[1]]
          curDeriction = 0;
          setStates()
        } else {
          this.setState({
            preDeriction: curDeriction,
            isAuto: true,
          })
        }
        break;
      case 2:
        if (curDeriction !== 0) {
          cursnakeHead = [cursnakeHead[0] + 1, cursnakeHead[1]]
          curDeriction = 2;
          setStates()
        } else {
          this.setState({
            preDeriction: curDeriction,
            isAuto: true,
          })
        }
        break;
      case 1:
        if (curDeriction !== 3) {
          cursnakeHead = [cursnakeHead[0], cursnakeHead[1] + 1]
          curDeriction = 1;
          setStates()
        } else {
          this.setState({
            preDeriction: curDeriction,
            isAuto: true,
          })
        }
        break;
      case 3:
        if (curDeriction !== 1) {
          cursnakeHead = [cursnakeHead[0], cursnakeHead[1] - 1]
          curDeriction = 3;
          setStates()
        } else {
          this.setState({
            preDeriction: curDeriction,
            isAuto: true,
          })
        }
        break;
      default:
        break;
    }
  }

  // 重新开始的提示弹窗
  loseGameModal = () => {
    confirm({
      title: '啊，我死了',
      content: '点击确认重新开始',
      okText: '确认',
      onOk: () => {
        snakeArray = [...Array(this.state.size)].map(_ => [...Array(this.state.size)].map(_ => 0))
        // 这里的setstate是在下次跟更新state的时候再一起更新的
        // 注意不要将需要立即更新的数据放在setstate的回调函数中
        // 因为会导致数据刷新不会立即生效（巨坑）
        this.setState({
          snakeHead: [3, 10],
          apple: [6, 8],
          snakes: [[3, 10], [3, 9], [3, 8]],
          preDeriction: 1,
          isAuto: false,
        })
      },
    });
  }

  // 得到不会和蛇的身体重复的新的苹果坐标
  getNewApple = () => {
    let appleX = Math.floor(Math.random() * this.state.size)
    let appleY = Math.floor(Math.random() * this.state.size)
    // 这里需要做优化，苹果的位置不能等于蛇的位置
    this.state.snakes.forEach(it => {
      if (it[0] === appleX && it[1] === appleY) {
        appleX = Math.floor(Math.random() * this.state.size)
        appleY = Math.floor(Math.random() * this.state.size)
      }
    })
    return [appleX, appleY]
  }

  /**
   * 展示贪吃蛇的小盒子
   * appleNumber是苹果在二维数组中的值
   * snakeHead是蛇头在二维数组中的值
   * snakeBody是蛇身在二维数组中的值
   * 通过不同的值给定不同的className
   */
  showSnakeBox = (states) => {
    const appleNumber = 3;
    const snakeHead = 1;
    const snakeBody = 2;
    let size = states.size;
    let i = 0;
    if (size !== undefined && size !== null && snakeArray !== null) {
      snakeArray[states.apple[0]][states.apple[1]] = appleNumber;
      states.snakes.forEach(it => {
        snakeArray[it[0]][it[1]] = snakeBody;
      });
      snakeArray[states.snakeHead[0]][states.snakeHead[1]] = snakeHead;
      return snakeArray.map((it) => {
        return (
          <tr className="each-row" key={i++}>
            {
              it.map((each) => {
                let eachClass = '';
                if (each === 0) {
                  // 是正常的格子也需要判断奇数偶数，来打印不同的颜色
                  eachClass = i % 2 === 0 ? 'double' : 'single'
                } else if (each === snakeHead) {
                  eachClass = 'snake-head';
                } else if (each === snakeBody) {
                  eachClass = 'snake-body';
                } else if (each === appleNumber) {
                  eachClass = 'apple';
                }
                return <td className={eachClass} key={i++} value={each}></td>
              })
            }
          </tr>
        )
      })
    }
  }

  // 这里需要每走一步判断，当前是否要清除之前的状态，不能直接 this.snakesChange(key)
  autoPlay = (key) => {
    isGoon = window.setTimeout(() => {
      // this.snakesChange(key)
      this.state.isAuto === true ? this.snakesChange(key) : window.clearTimeout(isGoon)
    }, 500)
  }

  render() {
    const states = this.state;
    return (
      <div id="snake-box">
        <span>我是贪吃蛇，嗷嗷嗷</span>
        <table className="snake-table">
          <tbody>
            {
              this.showSnakeBox(states)
            }
            {
              states.isAuto === true ? this.autoPlay(states.preDeriction) : ''
            }
          </tbody>
        </table>
      </div>
    )
  }

}