import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button } from 'semantic-ui-react';
import { LOGIN } from '../constants';

class UserForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: props.username || "",
			first_name: props.first_name || "",
			password: "",
			last_name: props.last_name || "",
			avatar_url: props.avatar_url || ""
		};
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = () => {
		fetch("http://localhost:3000/api/v1/register", {
			method: "POST",
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: LOGIN, payload });
				this.props.history.push("/campaigns");
			});
	} 

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit} >
					<Form.Field>
						<label>Username</label>
						<input 
							name="username"
							placeholder="Username..."
							value={this.state.username}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
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
