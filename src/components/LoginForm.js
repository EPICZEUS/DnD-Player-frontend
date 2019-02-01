import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Container, Button } from 'semantic-ui-react';

class LoginForm extends Component {
	state = {
		username: "",
		password: ""
	}

	handleSubmit = e => {
		e.preventDefault();

		const Authorization = "Basic " + btoa(this.state.username + ":" + this.state.password);

		fetch("http://localhost:3000/api/v1/login", { headers: { Authorization }})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: "LOGIN", payload });
				this.props.history.push("/campaigns");
			});
	}

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit}>
					<Form.Field>
						<label>Username</label>
						<input onChange={e => this.setState({ username: e.target.value })} placeholder="Username..." />
					</Form.Field>
					<Form.Field>
						<label>Password</label>
						<input type="password" onChange={e => this.setState({ password: e.target.value })} placeholder="Password..." />
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
