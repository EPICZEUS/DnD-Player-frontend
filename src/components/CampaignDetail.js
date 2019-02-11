import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Button } from 'semantic-ui-react';
import { DELETE_CAMPAIGN } from '../constants';

class CampaignDetail extends Component {
	handleDelete = () => {
		fetch("http://localhost:3000/api/v1/campaigns/" + this.props.id, { method: "DELETE", headers: { Authorization: "Bearer " + localStorage.token }});
		this.props.dispatch({ type: DELETE_CAMPAIGN, payload: this.props.id });
	}

	deleteButton = () => {
		if (this.props.user.id === this.props.dm.id) {
			return (
				<Button 
					negative
					size="mini"
					floated="right"
					data-action="delete"
					onClick={this.handleDelete}
				>
					Delete
				</Button>
			);
		}
	}

	handleRedirect = e => {
		if (e.target.dataset.action !== "delete") this.props.history.push(this.props.match.url + '/' + this.props.id);
	}

	render() {
		return (
			<Card link onClick={this.handleRedirect}>
				<Card.Content>
					<Card.Header>{this.props.name}</Card.Header>
					<Card.Meta><span className="dm">DMed by {this.props.dm.username}</span></Card.Meta>
					<Card.Description>{this.props.description}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Icon name="users" />{this.props.users.length}
					{this.deleteButton()}
				</Card.Content>
			</Card>
		);
	}
}

function mapState({ user = {}}) {
	return { user };
}

export default connect(mapState)(CampaignDetail);
