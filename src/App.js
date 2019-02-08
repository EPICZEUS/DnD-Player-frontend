import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Campaign from './containers/Campaign';
import CampaignList from './containers/CampaignList';
import LoginForm from './components/LoginForm';
import TopPanel from './components/TopPanel';
import UserForm from './components/UserForm';
import CharacterForm from './components/CharacterForm';
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
						<Route exact path="/campaigns/:id" component={withAuth(Campaign)} />
						<Route path="/campaigns/:campaign_id/characters/new" component={withAuth(CharacterForm)} />
						<Redirect from="/" to="/login" />
					</Switch>
				</Fragment>
			</Router>
		);
	}
}

export default App;
