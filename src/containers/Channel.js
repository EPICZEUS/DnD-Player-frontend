import React, { Component } from 'react';
import { Grid, Form } from 'semantic-ui-react';
import MessageList from './MessageList';
import UserList from './UserList';

class Channel extends Component {
	state = { content: "" }

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = e => {
		e.preventDefault();

		fetch("http://localhost:3000/api/v1" + this.props.match.url + "/messages", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body: JSON.stringify(this.state)
		});
		this.setState({ content: "" });
	}

	render() {
		return (
			<Grid container celled columns={2}>
				<Grid.Row>
					<Grid.Column width={13}>
						<MessageList match={this.props.match} />
						<Form reply onSubmit={this.handleSubmit} >
							<Form.TextArea
								name="content"
								style={{ height: 125 }}
								value={this.state.content}
								onChange={this.handleChange}
							/>
							<Form.Button fluid primary size="small" labelPosition="left" icon="edit" content="Send Message"/>
						</Form>
					</Grid.Column>

					<Grid.Column width={3}>
						<UserList
							users={this.props.users.sort((a, b) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()))}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default Channel;
