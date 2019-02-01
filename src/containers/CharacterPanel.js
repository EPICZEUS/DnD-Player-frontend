import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Segment, Button } from 'semantic-ui-react';
import Info from '../fragments/Info';

class CreaturePanel extends Component {
	content = () => {
		if (this.props.name) {
			return (
				<Fragment>
					<Card.Content>
						<Card.Header>{this.props.name}</Card.Header>
						<Card.Meta>
							<span className="type">{this.props.char_class}</span>
						</Card.Meta>
						<Info {...this.props} />
					</Card.Content>
					<Card.Content extra>
						Level: {this.props.level}<br />
						{" "}<Icon name="arrow alternate circle right" /> {this.props.speed}<br />
						<Button>Add</Button>
					</Card.Content>
				</Fragment>
			);
		} else {
			return <Segment placeholder />;
		}
	}

	render() {
		return (
			<Card>
				{this.content()}
			</Card>
		);
	}
}

function mapState({ characters = [], selectedCharacter }) {
	return { ...characters.find(character => character.id === selectedCharacter) };
}

export default connect(mapState)(CreaturePanel);
