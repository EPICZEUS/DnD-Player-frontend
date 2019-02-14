import React, { Component } from 'react';
import { List } from 'semantic-ui-react';
import User from '../components/User';

class UserList extends Component {
	render() {
		return (
			<List selection verticalAlign="middle">
				{this.props.users.map(user => <User key={user.id} {...user} />)}
			</List>
		);
	}
}

export default UserList;
