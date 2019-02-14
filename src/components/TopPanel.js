import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Image } from 'semantic-ui-react';
import { LOGOUT } from '../constants';

class TopPanel extends Component {
	handleLogout = () => {
		this.props.dispatch({ type: LOGOUT });

		this.props.history.push("/login");
	}

	render() {
		return localStorage.token ? (
			<List horizontal selection floated="right" id="top-panel">
				<List.Item
					onClick={() => this.props.history.push("/campaigns")}
				>
					Campaigns
				</List.Item>
				<List.Item
					onClick={this.handleLogout}
				>
					Log out
				</List.Item>
				<List.Item>
					<Image avatar src={this.props.user.avatar_url} />
				</List.Item>
			</List>
		) : <div></div>;
	}
}

export default connect(({ user }) => ({ user }))(TopPanel);
