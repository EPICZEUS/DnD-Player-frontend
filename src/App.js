import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Campaign from './containers/Campaign';
import CampaignList from './containers/CampaignList';
import LoginForm from './components/LoginForm';
import TopPanel from './components/TopPanel';
import UserForm from './components/UserForm';
import withAuth from './HOC/Auth';
import withoutAuth from './HOC/AntiLogin';

class App extends Component {
	render() {
		return (
			<Router>
				<Fragment>
					<Route path="/" component={TopPanel} />
					<Switch>
						<Route path="/login" component={withoutAuth(LoginForm)} />
						<Route path="/register" component={withoutAuth(UserForm)} />
						<Route exact path="/campaigns" component={withAuth(CampaignList)} />
						<Route path="/campaigns/:id" component={withAuth(Campaign)} />
						<Redirect from="/" to="/login" />
					</Switch>
				</Fragment>
			</Router>
		);
	}
}

export default App;
