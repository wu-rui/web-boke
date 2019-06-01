import React, { Component } from 'react';
import { Redirect } from 'react-router';
import LeftMenu from '../../common/leftMenu/leftMenu'
import Like from './component/myLike';
// import Setting from './component/mySetting';
// import Remark from './component/remark';
import Solution from './component/solution';
import MyArticle from './component/myArticle';
// import articles from '../../mockData/data';
import { UserContext } from '../../context';
import { Breadcrumb, Icon } from 'antd';
import './center.less'
// const confirm = Modal.confirm;

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
    name: '草稿箱',
    type: 'form'
  },
  {
    id: 4,
    name: '修改密码',
    type: 'property-safety'
  }
]

export default class Center extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuId: 1,
      // updatePsw: (psw) => this.updatePassword(psw),
    }
  }


  componentDidMount() {
    if (window.location.search === '?id=2') {
      this.setState({
        menuId: 2,
      })
    } else if (window.location.search === '?id=3') {
      this.setState({
        menuId: 3,
      })
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
    })
  }

  setMenuContent = (id, states) => {
    if (states.context !== undefined) {
      switch (id) {
        case 1: return (
          <Solution id={states.context.userPO.id} states={states} />
        );
        case 2: return (
          <MyArticle type={id} user={states.context} />
        );
        case 3: return (
          <MyArticle type={id} user={states.context} />
        );
        case 4: return (
          <Like update={this.state.updatePsw} user={states.context} updatePsw={states.updatePsw} />
        );

        default:
          break;
      }
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {(states) => {
          if (states.isOutLog) {
            return (
              <div id="center-content">
                <Breadcrumb>
                  <Breadcrumb.Item ><Icon type="home" /></Breadcrumb.Item>
                  <Breadcrumb.Item ><Icon type="user" /><span>个人中心</span></Breadcrumb.Item>
                </Breadcrumb>
                <div className="left-menu">
                  <LeftMenu data={list} selectNode={this.selectMenu} selectId={this.state.menuId} />
                </div>
                <div className="center-user">
                  {
                    this.setMenuContent(this.state.menuId, states)
                  }
                </div>
              </div>
            )
          } else {
            return (<Redirect to="/login" />)
          }
        }}
      </UserContext.Consumer>
    )
  }
}
