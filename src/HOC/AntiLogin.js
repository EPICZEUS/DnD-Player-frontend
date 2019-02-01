import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

function withoutAuth(WrappedComponent) {
	return class AntiLogin extends Component {
		render() {
			if (localStorage.token) return <Redirect to="/campaigns" />;
			else return <WrappedComponent {...this.props} />;
		}
	};
}

export default withoutAuth;