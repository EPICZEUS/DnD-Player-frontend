import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function withAuth(WrappedComponent) {
	return class Auth extends Component {
		render() {
			if (!localStorage.token) return <Redirect to="/login" />;
			else return <WrappedComponent {...this.props} />;
		}
	};
}

export default withAuth;
