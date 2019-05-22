import React, { Component } from 'react';
import { Menu, Icon, Input } from 'antd'
import './headNav.less';
import { Link } from 'react-router-dom';
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
	handleClick = (e) => { //点击事件
		this.setState({ current: e.key });
	}

	componentDidMount() {
		if (this.props.user.isLogin) {
			debugger
			this.setState({
				username: this.props.user.context.username,
			})
		}
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
							<Menu.Item key="center" >
								<Link to="/center">个人中心</Link>
							</Menu.Item>
							<label className="user-name">hello，{this.state.username}</label>
						</Menu>
					</div>
				</div>
			</div>

		)
	}
}
