import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Container, Button, Message } from 'semantic-ui-react';
import { LOGIN } from '../constants';

class LoginForm extends Component {
	state = {
		error: false,
		username: "",
		password: ""
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value, error: false })

	handleSubmit = e => {
		e.preventDefault();

		const Authorization = "Basic " + btoa(this.state.username + ":" + this.state.password);

		fetch("http://localhost:3000/api/v1/login", { headers: { Authorization }})
			.then(async r => {
				if (!r.ok) throw { response: r,  ...(await r.json()) };
				return r.json();
			})
			.then(payload => {
				this.props.dispatch({ type: LOGIN, payload });
				this.props.history.push("/campaigns");
			})
			.catch(err => this.setState({ error: err.message }));
	}

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit} error={!!this.state.error}>
					<Message error onDismiss={() => this.setState({ error: false })}>
						<Message.Header>{this.state.error}</Message.Header>
					</Message>
					<Form.Field>
						<label>Username</label>
						<input
							name="username"
							value={this.state.username}
							onChange={this.handleChange}
							placeholder="Username..."
						/>
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
							placeholder="Password..."
						/>
					</Form.Field>
					<Button.Group vertical>
						<Form.Button primary>Login</Form.Button>
						<Button onSubmit={e => e.preventDefault()} onClick={() => this.props.history.push("/register")}>Register</Button>
					</Button.Group>
				</Form>
			</Container>
		);
	}
}

function mapState() {
	return {};
}

export default connect(mapState)(LoginForm);
