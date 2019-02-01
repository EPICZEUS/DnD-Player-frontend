import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import Encounter from './Encounter';
// import Channel from './Channel';

class Campaign extends Component {
	constructor(props) {
		super(props);
		
		this.state = { ...this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id)) };
	}

	loadCampaign = () => this.setState({ ...this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id)) });

	componentDidMount() {
		if (this.props.campaigns.length) return;

		fetch("http://localhost:3000/api/v1/campaigns", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: "LOAD_CAMPAIGNS", payload });
				this.setState({ ...this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id)) });
			});
	}

	render() {
		return (
			<Container>
				<h1>{this.state.name}</h1>
				<p>{this.state.description}</p>
				<Encounter
					match={this.props.match}
					owner={this.state.dm && this.state.dm.id === this.props.user.id}
				/>

			</Container>
		);
	}
}

function mapState({ campaigns = [], user = {}}) {
	return { campaigns, user };
}

export default connect(mapState)(Campaign);