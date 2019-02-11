import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Segment, Input, Button } from 'semantic-ui-react';
import Character from '../components/Character';
import CharacterPanel from './CharacterPanel';

class CharacterList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filter: "",
			selected: null,
			characters: this.props.characters.filter(character => character.campaign.id === Number(this.props.match.params.id))
		};
	}

	handleClick = selected => this.setState({ selected })
	
	filteredCharacters = () => {
		let filtered = this.state.characters
			.filter(char => !this.props.active.some(act => act.id === char.id))
			.filter(char => char.name.toLowerCase().includes(this.state.filter) || char.char_class.toLowerCase().includes(this.state.filter))

		if (this.props.user.id !== Number(this.props.match.params.id)) filtered = filtered.filter(char => char.user.id === this.props.user.id);

		return filtered;
	}

	componentDidMount() {
		if (this.props.characters.length > 1) return;

		fetch("http://localhost:3000/api/v1/characters", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: "LOAD_CHARACTERS", payload });
				this.setState({ characters: payload.filter(character => character.campaign.id === Number(this.props.match.params.id)) });
			});
	}

	render() {
		return (
			<div>
				<Input
					fluid
					icon="search"
					placeholder="Filter..."
					onChange={e => this.setState({ filter: e.target.value.toLowerCase() })}
					value={this.state.filter}
				/>
				<Segment style={{ overflow: "auto", height: 700 }}>
					<Card.Group itemsPerRow={1}>
						{this.filteredCharacters().map(char => <Character key={char.id} handleClick={this.handleClick} {...char} />)}
					</Card.Group>
				</Segment>
				<Button
					fluid
					size="small"
					onClick={() => this.props.history.push(this.props.match.url + "/characters/new")}
				>
					New Character
				</Button>
				<CharacterPanel handleClick={this.props.handleClick} {...this.props.characters.find(char => char.id === this.state.selected)} />
			</div>
		);
	}
}

function mapState({ characters = [], user }) {
	return { characters, user };
}

export default connect(mapState)(CharacterList);
