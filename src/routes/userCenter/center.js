import React, { Component } from 'react';
import './center.less'
import LeftMenu from '../../common/leftMenu/leftMenu'
import Like from './component/myLike';
import Setting from './component/mySetting';
import Remark from './component/remark';
import Solution from './component/solution';
import MyArticle from './component/myArticle';
import articles from '../../mockData/data';
import { UserContext } from '../../context';


const list = [
  {
    id: 1,
    name: '基本资料',
    type: 'solution'
  },
  {
    id: 2,
    name: '我的文章',
    type: 'file-text'
  },
  {
    id: 3,
    name: '我的评论',
    type: 'form'
  },
  {
    id: 4,
    name: '我的喜欢',
    type: 'like'
  },
  {
    id: 5,
    name: '基础设置',
    type: 'setting'
  },
]

export default class Center extends Component {

  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      menuId: 1,
    }
  }

  selectMenu = (e) => {
    let selectSort = e.target;
    let id = selectSort.value;
    let selectList = selectSort.parentNode;
    let list = selectSort.parentNode.parentNode.childNodes;
    for (let i = 0; i < list.length; i++) {
      list[i].classList.remove('active');
    }
    selectList.classList.add('active');
    this.setState({
      menuId: id,
    }, () => {
      console.log('点击后的id为', this.state.menuId)
    })
  }

  setMenuContent = (id, result) => {
    debugger
    switch (id) {
      case 1: return (
        <Solution />
      );
      case 2: return (
        <MyArticle data={articles} />
      );
      case 3: return (
        <Remark />
      );
      case 4: return (
        <Like />
      );
      case 5: return (
        <Setting userMsg={result} />
      );
      default:
        break;
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {(states) => {
          console.log('center', states);
          return (
            <div id="center-content">
              <div className="left-menu">
                <LeftMenu data={list} selectNode={this.selectMenu} selectId={this.state.menuId} />
              </div>
              <div className="center-user">
                {
                  this.setMenuContent(this.state.menuId, states.context)
                }
              </div>
            </div>
          )
        }


        }
      </UserContext.Consumer>
    )
  }
}
