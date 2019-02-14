import React, { Component } from 'react';
import { Comment } from 'semantic-ui-react';

class Message extends Component {
	render() {
		return (
			<Comment>
				<Comment.Avatar src={this.props.user.avatar_url} />
				<Comment.Content>
					<Comment.Author>{this.props.user.username}</Comment.Author>
					<Comment.Text>{this.props.content}</Comment.Text>
				</Comment.Content>
			</Comment>
		);
	}
}

export default Message;
