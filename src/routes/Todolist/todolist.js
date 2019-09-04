import React, { Component } from 'react';
import { Icon } from 'antd';

import './todolist.less';
export default class Todolist extends Component {

  // curListState,0代表全选，1代表查看未完成，2代表查看已完成
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      originList: [],
      undone: 0,
      isAllSelect: false,
      curListState: 0,
      isDisable: true,
      isShowClear: false,
    }
    window.onbeforeunload = () => {
      localStorage.setItem('userForTodo', JSON.stringify(this.state.originList))
      localStorage.setItem('usertodostate', JSON.stringify(this.state.curListState))
    }
  }

  // 关闭，刷新页面的时候保存数据
  saveState = (lists) => {
    window.localStorage.setItem('usertodostate', JSON.stringify(this.state.curListState))
    window.localStorage.setItem('userForTodo', JSON.stringify(lists))
  }

  // 初始化数据
  componentDidMount() {
    this.loadList()
  }

  // 初始化显示哪个状态下的数据
  showWitch = () => {
    let idx = this.state.curListState;
    this.chaneButtons(idx + 1)
    if (idx === 1) {
      this.getUnDone()
    } else if (idx === 2) {
      this.getDone()
    }
  }

  // 改变按钮状态
  chaneButtons = (idx) => {
    let node = document.querySelectorAll('.buttom-li span')
    if (node && node.length > 0 && idx) {
      node.forEach(it => {
        it.classList.remove('is-select')
      })
      node[idx].classList.add('is-select')
    }
    if (this.state.undone === this.state.originList.length) {
      node[4].style.display = 'none'
    } else {
      node[4].style.display = ''
    }
  }

  // 初始化列表
  loadList = () => {
    let lists = JSON.parse(localStorage.getItem('userForTodo'))
    let states = JSON.parse(localStorage.getItem('usertodostate'))
    if (lists) {
      let undone = lists.filter(it => it.isDone === false).length
      let isAllSelect = false;
      if (undone === 0 && lists.length > 0) {
        isAllSelect = true;
      }
      this.setState({
        lists: lists,
        originList: lists,
        undone: undone,
        isAllSelect: isAllSelect,
        curListState: Number(states),
      }, () => {
        this.showWitch()
      })
    }
  }

  // 保存数据
  saveMsg = (e) => {
    if (e.keyCode === 13) {
      let msg = {
        context: e.target.value,
        isDone: false,
      }
      let lists = this.state.originList.slice()
      lists.unshift(msg)
      e.target.value = ''
      let undone = lists.filter(it => it.isDone === false).length
      this.setState({
        lists: lists,
        originList: lists,
        undone: undone,
      }, () => {
        this.showWitch()
      })
    }
  }

  // 删除列表项
  deleteTodo = (e) => {
    let lists = this.state.lists
    // 得到当前点击的下标 
    let idx = Number(e.currentTarget.dataset.idx)
    let undone = this.state.undone;
    let preIsDone = lists[idx].isDone
    if (e.target.nodeName === 'svg') {
      lists.splice(idx, 1)
      undone = lists.filter(it => it.isDone === false).length
    } else if (e.target.className === 'input-select') {
      lists[idx].isDone = !preIsDone;
      // 加1或者减1
      undone = preIsDone ? undone + 1 : undone - 1;
    }

    this.setState({
      originList: lists,
      lists: lists,
      undone: undone,
    }, () => {
      this.chaneButtons()
    })
  }

  // 选择所有
  selectAll = (e) => {
    let lists = this.state.lists;
    let isAllSelect = this.state.isAllSelect;
    lists.map(it => it.isDone = isAllSelect ? false : true)
    this.setState({
      originList: lists,
      lists: lists,
      undone: isAllSelect ? lists.length : 0,
      isAllSelect: !isAllSelect,
    }, () => {
      this.chaneButtons()
    })
  }

  // 显示所有
  getAll = () => {
    let lists = this.state.originList.slice()
    this.chaneButtons(1)
    this.setState({
      lists: lists,
      isUnDone: false,
      isAll: false,
      isDone: false,
      curListState: 0,
    })
  }

  // 显示未完成
  getUnDone = () => {
    let lists = this.state.originList.slice()
    let unDoneList = lists.filter(it => it.isDone === false)
    this.chaneButtons(2)
    this.setState({
      lists: unDoneList,
      isUnDone: true,
      isAll: false,
      isDone: false,
      curListState: 1,
    })
  }

  // 显示已完成
  getDone = () => {
    let lists = this.state.originList.slice()
    let unDoneList = lists.filter(it => it.isDone === true)
    this.chaneButtons(3)
    this.setState({
      lists: unDoneList,
      isDone: true,
      isAll: false,
      isUnDone: false,
      curListState: 2,
    })
  }

  // 清除所有已经完成
  clearAllDone = (e) => {
    let lists = this.state.lists;
    let unDoneList = lists.filter(it => it.isDone === false)
    this.saveState(unDoneList)
    e.target.style.display = 'none'
    this.setState({
      lists: unDoneList,
      originList: unDoneList,
      undone: unDoneList.length
    })
  }

  // 改变列表的数据，更新数据
  changeText = (e) => {
    let cur = e.target.disabled
    e.target.disabled = !cur;
  }

  // 新增列表更新数据
  getValue = (e) => {
    let curValue = e.target.value;
    let idx = Number(e.target.parentNode.dataset.idx);
    let list = this.state.originList.slice()
    list[idx].context = curValue;
    this.setState({
      lists: list,
      originList: list,
    })
  }

  // 添加todo列表
  addTodo = () => {
    return (
      <div >
        {
          this.state.lists.map((it, idx) => {
            let isDone = it.isDone ? 'is-done' : ''
            return (
              <li className={`input-li todo-li ${isDone}`} key={it + idx} onClick={this.deleteTodo} onDoubleClick={this.changeText} data-idx={idx}  >
                <div className="input-select" ></div>
                <input type="text" className="input-content" disabled={this.state.isDisable} onChange={this.getValue} onBlur={this.changeText} value={it.context} />
                <Icon type="close-circle" className="todo-close" />
              </li>
            )
          })
        }
      </div>
    )
  }

  // 添加按钮
  addButtons = () => {
    return (
      <li className="buttom-li">
        <span className="total-undone">剩余未完成  {this.state.undone}</span>
        <span onClick={this.getAll}>全部</span>
        <span onClick={this.getUnDone}>未完成</span>
        <span onClick={this.getDone}>已完成</span>
        <span onClick={this.clearAllDone}>清除已完成</span>
      </li>
    )
  }

  render() {
    let isAll = ''
    if (this.state.undone === 0 && this.state.originList.length > 0) {
      isAll = 'green'
    }
    return (
      <div id="todo-list" >
        <p className="logo">todos</p>
        <div className="todo-box">
          <ul className="todo-ul">
            <li className="input-li">
              <div className="input-select" id="select-all" onClick={this.selectAll} style={{ backgroundColor: isAll }} ></div>
              <input type="text" autoFocus className="input-text" placeholder="你快点记点东西吧，球球你" onKeyDown={this.saveMsg} />
            </li>
            {
              this.addTodo()
            }
            {
              this.state.originList.length > 0 ? this.addButtons() : ''
            }

          </ul>
        </div>
      </div>
    )
  }
} 