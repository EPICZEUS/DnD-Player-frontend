import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class Creature extends Component {
	handleClick = () => this.props.handleClick(this.props.id)

	render() {
		return (
			<Card link onClick={this.handleClick}>
				<Card.Content>
					<Card.Header>{this.props.name}</Card.Header>
					<Card.Meta>
						<span className="type">{this.props.creature_type}</span>
					</Card.Meta>
					<Card.Description>
						<Icon name="heart" /> {this.props.hp}<br />
						<Icon name="shield" /> {this.props.armor_class}<br />
						<Icon name="arrow alternate circle right" /> {this.props.speed}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Icon name="fire" /> {this.props.challenge_rating}
				</Card.Content>
			</Card>
		);
	}
}

export default Creature;
