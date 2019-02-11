import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Image } from 'semantic-ui-react';
import { LOGOUT } from '../constants';

class TopPanel extends Component {
	handleLogout = () => {
		this.props.dispatch({ type: LOGOUT });

		this.props.history.push("/login");
	}

	render() {
		return localStorage.token ? (
			<div>
				<Button.Group floated="right">
					<Button
						onClick={() => this.props.history.push("/campaigns")}
						size="small"
					>
						Campaigns
					</Button>
					<Button
						onClick={this.handleLogout}
						size="small"
						negative
					>
						Log out
					</Button>
				</Button.Group>
				<Image avatar src={this.props.user.avatar_url} />
			</div>
		) : null;
	}
}

export default connect(({ user }) => ({ user }))(TopPanel);
