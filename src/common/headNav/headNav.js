import React, { Component } from 'react';
import { Menu, Icon, Input } from 'antd'
import './headNav.less'
import { Link } from 'react-router-dom'
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
	handleClick = (e) => { //点击事件
		this.setState({ current: e.key });
	}
	render() {
		return (
			<div id="HeadNav">
				<div className="nav-wrap">
					<div className="wrap nav-logo-wrap">
						<Icon type="disconnect" className="nav-logo" />
						<label className="nav-title">README</label>
						<Search
							placeholder="input search text"
							onSearch={value => console.log(value)}
							style={{ width: 180, outline: 'none' }}
						/>
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
							{/* <Menu.Item key="login">
								<Link to="/login">登录</Link>
							</Menu.Item>
							<Menu.Item key="enroll" >
								<Link to="/enroll">注册</Link>
							</Menu.Item> */}
							<Menu.Item key="center" >
								<Link to="/center">个人中心</Link>
							</Menu.Item>
						</Menu>
					</div>
				</div>
			</div>
		)
	}
}


{/* <div className="header">
					<div className="header-block">
						<a className="header-name">简记</a>
						<a className="header-home">首页</a>
						<div className="header-search">
							<div className="input-group">
								<input type="text" className="form-control" placeholder="搜索" />
								<span className="input-group-btn">
									<button className="btn btn-default" type="button">Go!</button>
								</span>
							</div>
						</div>
						<a className="header-home login btn btn-default  btn-sm" href="login.html">登录</a>
						<a className="header-home enroll btn btn-default btn-sm" href="enroll.html">注册</a>
					</div>
				</div> */}