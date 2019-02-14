import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Comment } from 'semantic-ui-react';
import { LOAD_MESSAGES } from '../constants';
import Message from '../components/Message';

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.campaign = this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id));
	}

	componentDidMount() {
		fetch("http://localhost:3000/api/v1/messages", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: LOAD_MESSAGES, payload });
				const campaign = this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id));

				this.msg_count = this.props.messages.filter(m => m.channel.id === campaign.channel.id).length;
				this.bottom.scrollIntoView();
			});
	}

	componentDidUpdate() {
		if (this.msg_count < this.messages.length) {
			this.msg_count = this.messages.length;
			this.bottom.scrollIntoView({ behavior: "smooth" });
		}
	}

	render() {
		const campaign = this.props.campaigns.find(campaign => campaign.id === Number(this.props.match.params.id));
		this.messages = this.props.messages.filter(m => m.channel.id === campaign.channel.id);

		return (
			<Comment.Group style={{ height: 700, overflowY: "auto" }}>
				{this.messages.map(m => <Message key={m.id} {...m} />) }
				<div style={{ float: "left", clear: "both" }} ref={el => this.bottom = el} />
			</Comment.Group>
		);
	}
}

function mapState({ messages = [], campaigns =[]}) {
	return { messages, campaigns };
}

export default connect(mapState)(MessageList);
