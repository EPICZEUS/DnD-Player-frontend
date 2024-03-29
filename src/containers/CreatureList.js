import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Segment, Input } from 'semantic-ui-react';
import Creature from '../components/Creature';
import CreaturePanel from './CreaturePanel';

class CreatureList extends Component {
	state = { filter: "", selected: null }

	handleClick = selected => this.setState({ selected })

	filteredCreatures = () => this.props.creatures.filter(creature => creature.name.toLowerCase().includes(this.state.filter.toLowerCase())
		|| creature.creature_type.toLowerCase().includes(this.state.filter)
		|| creature.challenge_rating <= Number(this.state.filter)
	)

	render() {
		return (
			<div>
				<Input
					icon="search"
					fluid
					placeholder="Filter..."
					onChange={e => this.setState({ filter: e.target.value })}
					value={this.state.filter}
				/>
				<Segment style={{ overflowY: "auto", height: 700 }}>
					<Card.Group itemsPerRow={1}>
						{this.filteredCreatures().map(creature => <Creature key={creature.id} handleClick={this.handleClick} {...creature} />)}
					</Card.Group>
				</Segment>
				<CreaturePanel handleClick={this.props.handleClick} {...this.props.creatures.find(creature => creature.id === this.state.selected)}/>
			</div>
		);
	}
}

function mapState({ creatures = []}) {
	creatures.sort((a, b) => a.name.localeCompare(b.name));

	return { creatures };
}

export default connect(mapState)(CreatureList);
