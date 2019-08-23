import React, { Component } from 'react';
import { Menu, Icon, Input, Dropdown, Avatar } from 'antd';
import './headNav.less';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
const Search = Input.Search;

export default class HeadNav extends Component {
	constructor(props) {
		super(props);
		var location = this.props.location.pathname.split('/');
		var currentName = location[location.length - 1] ? location[location.length - 1] : 'home';
		this.state = {
			current: currentName,
		}
	}

	// 下拉框菜单
	menu = (result) => {
		return (
			<Menu onClick={({ key }) => { this.menuOnClick(result, key) }}>
				<Menu.Item key="1"><Link to="/center">个人中心</Link></Menu.Item>
				<Menu.Item key="2">退出登录</Menu.Item>
			</Menu>
		)
	}

	// 点击下拉框菜单事件
	menuOnClick = (res, key) => {
		if (key === '2') {
			res.outlog(key);
		}
	}

	// handleClick = (e) => { //点击事件
	// 	this.setState({ current: e.key });
	// }

	showUser = (result) => {
		if (result.isLogin) {
			// this.getOutLog(result);
			return (
				<Dropdown overlay={this.menu(result)}>
					<a className="ant-dropdown-link" href="#">
						{
							this.showAvatar(result.src)
							// result.src.length === 0 ? <Avatar size={32} icon="user" /> : <img src={result.src} alt="头像" />
						}
						<Icon type="down" />
					</a>
				</Dropdown>
			)
		}
	}
	showAvatar = (src) => {
		if (src !== '' && src !== null && src !== undefined) {
			return (
				<img src={src} alt="头像" />
			)
		} else {
			return (
				<Avatar style={{ margin: 5 }} size={40} icon="user" />
			)
		}
	}

	render() {
		return (
			<UserContext.Consumer>
				{(result) => (
					<div id="HeadNav">
						<div className="nav-wrap">
							<div className="wrap nav-logo-wrap">
								{/* <Icon type="disconnect" className="nav-logo" /> */}
								<img style={{ width: 30, marginBottom: 2, marginRight: 5 }} src="/image/logo.jpg" alt="小博客图标" />
								<label className="nav-title">小博客</label>
								<Search
									placeholder="请输入需要搜索的文章标题"
									onSearch={value => console.log(value)}
								/>
							</div>
							<div className="wrap nav-list-wrap">
								<Menu
									selectedKeys={[this.state.current]}
									mode="horizontal"
								>
									<Menu.Item key="home">
										<Link to="/">发现</Link>
									</Menu.Item>
									<Menu.Item key="writePage">
										<Link to="/write" target="_blank">写文章</Link>
									</Menu.Item>
									<Menu.Item key="snake">
										<Link to="/snake" >贪吃蛇</Link>
									</Menu.Item>
									{this.showUser(result)}
								</Menu>
							</div>
						</div>
					</div>
				)}
			</UserContext.Consumer>
		)
	}
}
