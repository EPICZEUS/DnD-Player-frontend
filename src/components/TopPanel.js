import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class TopPanel extends Component {
	handleLogout = () => {
		delete localStorage.token;
		this.props.dispatch({ type: "LOGOUT" });

		this.props.history.push("/login");
	}

	render() {
		// debugger;
		const vals = this.props.location.pathname.split("/");

		const last = Number(vals[vals.length - 1]);

		// debugger;

		return localStorage.token ? (
			<Button.Group floated="right">
				{!isNaN(last) && vals[vals.length - 2] === "campaigns" ? (
					<Button>
						New Character
					</Button>
				) : null}
				<Button
					onClick={this.handleLogout}
					size="small"
					negative
				>
					Log out
				</Button>
			</Button.Group>
		) : null;
	}
}

export default connect()(TopPanel);
