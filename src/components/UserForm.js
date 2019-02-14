import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { LOGIN } from '../constants';

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			username: props.username || "",
			first_name: props.first_name || "",
			password: "",
			last_name: props.last_name || "",
			avatar_url: props.avatar_url || ""
		};
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value, error: false })

	handleSubmit = () => {
		fetch("http://localhost:3000/api/v1/register", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(async r => {
				if (!r.ok) throw { response: r, ...(await r.json()) };
				return r.json();
			})
			.then(payload => {
				this.props.dispatch({ type: LOGIN, payload });
				this.props.history.push("/campaigns");
			})
			.catch(err => this.setState({ error: { props: err.errors, messages: err.messages }}));
	} 

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit} error={!!this.state.error} >
					<Message error onDismiss={() => this.setState({ error: false })}>
						<Message.Header>There was a problem creating your user.</Message.Header>
						<Message.List>
							{this.state.error && this.state.error.messages.map((err, i) => <Message.Item key={i}>{err}</Message.Item>)}
						</Message.List>
					</Message>
					<Form.Field error={this.state.error && this.state.error.props.includes("username")}>
						<label>Username</label>
						<input 
							name="username"
							placeholder="Username..."
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field error={this.state.error && this.state.error.props.includes("password")}>
						<label>Password</label>
						<input
							name="password"
							type="password"
							placeholder="Password..."
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>First Name</label>
						<input
							name="first_name"
							placeholder="First Name..."
							value={this.state.first_name}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Last Name</label>
						<input
							name="last_name"
							placeholder="Last Name..."
							value={this.state.last_name}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Avatar URL</label>
						<input
							name="avatar_url"
							placeholder="Avatar URL..."
							value={this.state.avatar_url}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Button.Group vertical>
						<Form.Button primary>Register</Form.Button>
						<Button negative onClick={() => this.props.history.push("/login")}>Cancel</Button>
					</Button.Group>
				</Form>
			</Container>
		);
	}
}

function mapState({ user }) {
	return { ...user };
}

export default connect(mapState)(UserForm);
