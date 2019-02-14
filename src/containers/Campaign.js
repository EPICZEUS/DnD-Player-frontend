import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, List } from 'semantic-ui-react';
import Encounter from './Encounter';
import Channel from './Channel';
import { LOAD_CAMPAIGNS, LOAD_CREATURES } from '../constants';

class Campaign extends Component {
	constructor(props) {
		super(props);

		this.state = { active: true };
	}

	loadCampaign = () => this.setState({ ...this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id)) });

	componentDidMount() {
		if (this.props.campaigns.length) return;

		fetch("http://localhost:3000/api/v1/campaigns", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => this.props.dispatch({ type: LOAD_CAMPAIGNS, payload }));

		fetch("http://localhost:3000/api/v1/creatures", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => this.props.dispatch({ type: LOAD_CREATURES, payload }));
	}

	render() {
		const campaign = this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id)) || {};

		return (
			<Container>
				<h1>{campaign.name}</h1>
				<p>{campaign.description}</p>
				<List selection horizontal>
					<List.Item onClick={() => this.setState({ active: true })}>Campaign</List.Item>
					<List.Item onClick={() => this.setState({ active: false })}>Chat</List.Item>
				</List>
				{
					this.state.active ? (
						<Encounter
							currentEncounter={campaign.selected_encounter}
							match={this.props.match}
							history={this.props.history}
							owner={campaign.dm && campaign.dm.id === this.props.user.id}
						/>
					) : (
						<Channel
							users={campaign.users || []}
							match={this.props.match}
						/>
					)
				}
			</Container>
		);
	}
}

function mapState({ campaigns = [], user = {}}) {
	return { campaigns, user };
}

export default connect(mapState)(Campaign);