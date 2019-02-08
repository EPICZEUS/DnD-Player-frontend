import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

class Character extends Component {
	render() {
		return (
			<Card link onClick={() => this.props.handleClick(this.props.id)}>
				<Card.Content>
					<Card.Header>{this.props.name}</Card.Header>
					<Card.Meta>
						<span className="class">{this.props.char_class}</span>
					</Card.Meta>
					<Card.Description>
						<Icon name="heart" /> {this.props.hp}<br />
						<Icon name="shield" /> {this.props.armor_class}<br />
						<Icon name="arrow alternate circle right" /> {this.props.speed}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Icon name="fire" /> {this.props.level}
				</Card.Content>
			</Card>
		);
	}
}

export default Character;
