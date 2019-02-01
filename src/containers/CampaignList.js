import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Card, Form, Checkbox } from 'semantic-ui-react';
import CampaignDetail from '../components/CampaignDetail';

class CampaignList extends Component {
	state = {
		name: "",
		description: "",
		public: false
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleSubmit = () => {
		fetch("http://localhost:3000/api/v1/campaigns", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
			.then(r => r.json())
			.then(({ campaign: payload }) => {
				this.props.dispatch({ type: "ADD_CAMPAIGN", payload });
				this.setState({
					name: "",
					description: "",
					public: true
				});
			});
	}

	componentDidMount() {
		if (this.props.campaigns.length) return;

		fetch("http://localhost:3000/api/v1/campaigns", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => this.props.dispatch({ type: "LOAD_CAMPAIGNS", payload }));
	}

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit} >
					<Form.Field>
						<label>Name</label>
						<input
							name="name" 
							placeholder="Name..."
							value={this.state.name}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Description</label>
						<input
							name="description"
							placeholder="Description..."
							value={this.state.description}
							onChange={this.handleChange}
						/>
					</Form.Field>
					<Form.Field>
						<Checkbox
							label="Public"
							type="checkbox" 
							name="public"
							checked={this.state.public}
							onChange={() => this.setState({ public: !this.state.public })}
						/>
					</Form.Field>
					<Form.Button>Create Campaign</Form.Button>
				</Form>
				<br />
				<Card.Group itemsPerRow={4}>
					{this.props.campaigns.map(campaign => (
						<CampaignDetail
							key={campaign.id}
							match={this.props.match}
							history={this.props.history}
							{...campaign}
						/>
					))}
				</Card.Group>
			</Container>
		);
	}
}

function mapState({ campaigns = []}) {
	return { campaigns: campaigns.filter(campaign => campaign.public) };
}

export default connect(mapState)(CampaignList);
