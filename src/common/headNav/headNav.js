import React, { Component } from 'react';
import { Menu, Icon, Input, Dropdown } from 'antd';
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
			userName: null,
		}
	}

	// 下拉框菜单
	menu = (result) => {
		return (
			<Menu onClick={({ key }) => { this.menuOnClick(result, key) }}>
				<Menu.Item key="1"><Link to="/center" target="_blank">个人中心</Link></Menu.Item>
				<Menu.Item key="2">退出登录</Menu.Item>
			</Menu>
		)
	}
	点击下拉框菜单事件
	menuOnClick = (res, key) => {

		console.log(res)
		if (key === '2') {
			console.log('key', { key });
			// this.getOutLog;
			res.outlog(key);
		}
		// console.log('resulr', result);
		console.log('key', { key });
	}

	handleClick = (e) => { //点击事件
		this.setState({ current: e.key });
	}

	componentDidMount() {
		if (this.props.user.isLogin) {
			this.setState({
				username: this.props.user.context.username,
			})
		}
	}
	getOutLog = (result) => {
		return result;
	}
	showUser = (result) => {
		if (result.isLogin) {
			this.getOutLog(result);

			return (
				<Dropdown overlay={this.menu(result)}>
					<a className="ant-dropdown-link" href="#">
						hello，{result.context.userPO.username}<Icon type="down" />
					</a>
				</Dropdown>
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
								<Icon type="disconnect" className="nav-logo" />
								<label className="nav-title">README</label>
								{/* <Search
									placeholder="input search text"
									onSearch={value => console.log(value)}
									style={{ width: 180, outline: 'none' }}
								/> */}
							</div>
							<div className="wrap nav-list-wrap">
								<Menu
									selectedKeys={[this.state.current]}
									mode="horizontal"
									onClick={this.handleClick}
								>
									<Menu.Item key="home">
										<Link to="/">发现</Link>
									</Menu.Item>
									<Menu.Item key="writePage">
										<Link to="/write" target="_blank">写文章</Link>
									</Menu.Item>
									{

										this.showUser(result)
									}
								</Menu>
							</div>
						</div>
					</div>
				)}
			</UserContext.Consumer>
		)
	}
}
