import React, { Component, Fragment } from 'react';
import { Card } from 'semantic-ui-react';

class Info extends Component {
	render() {
		return (
			<Fragment>
				<Card.Description>
					<div>Strength: {this.props.str}</div>
					<div>Dexterity: {this.props.dex}</div>
					<div>Constitution: {this.props.con}</div>
					<div>Intelligence: {this.props.int}</div>
					<div>Wisdom: {this.props.wis}</div>
					<div>Charisma: {this.props.cha}</div>
				</Card.Description>
			</Fragment>
		);
	}
}

export default Info;
