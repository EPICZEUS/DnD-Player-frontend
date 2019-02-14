import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

class User extends Component {
	render() {
		return (
			<List.Item>
				<Image avatar src={this.props.avatar_url} />
				<List.Content>
					<List.Header>
						{this.props.username}
					</List.Header>
				</List.Content>
			</List.Item>
		);
	}
}

export default User;
