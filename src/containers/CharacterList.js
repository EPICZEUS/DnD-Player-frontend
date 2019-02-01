import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Segment } from 'semantic-ui-react';
import Character from '../components/Character';
import CharacterPanel from './CharacterPanel';

class CharacterList extends Component {
	constructor(props) {
		super(props);

		this.state = { characters: this.props.characters.filter(character => character.campaign.id === this.props.match.params) };
	}
	componentDidMount() {
		if (this.props.characters.length) return;

		fetch("http://localhost:3000/api/v1/characters", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => this.props.dispatch({ type: "LOAD_CHARACTERS", payload }));
	}

	render() {
		return (
			<div>
				<Segment style={{ overflow: "auto", height: 700 }}>
					<Card.Group itemsPerRow={1}>
						{this.props.characters.map(char => <Character key={char.id} dispatch={this.props.dispatch} {...char} />)}
					</Card.Group>
				</Segment>
				<CharacterPanel />
			</div>
		);
	}
}

function mapState({ characters = []}) {
	return { characters };
}

export default connect(mapState)(CharacterList);
