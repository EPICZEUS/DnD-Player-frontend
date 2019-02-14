import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Token from './Token';

class GridMap extends Component {
	createRows = () => {
		const out = [];

		for (let i = 16; i > 0; i--) {
			out.push(
				<Grid.Row style={{ height: "40px" }} key={i}>
					{this.createColumns(i)}
				</Grid.Row>
			);
		}

		return out;
	}

	createColumns = y => {
		const out = [];

		for (let i = 1; i < 17; i++) {
			const playable = this.props.characters.find(char => {
				const position = char.positions.find(pos => !pos.encounter || pos.encounter.id === this.props.encounter_id);
				return position.x === i && position.y === y;
			}) || this.props.creatures.find(crea => {
				const position = crea.positions.find(pos => !pos.encounter || pos.encounter.id === this.props.encounter_id);
				return position.x === i && position.y === y;
			});

			let type;

			if (playable) type = playable.user ? "character" : "creature";

			// console.log("X", i, "Y", y, this.props.characters.some(char => {
			// 	const position = char.positions.find(pos => pos.encounter_id === this.props.encounter_id)
			// 	return position.x === i && position.y === y;
			// }), playable)

			out.push(
				<Grid.Column style={{ width: "6.25%" }} width={1} key={i + "" + y}>
					<Token handleClick={this.props.handleClick} data={playable} type={type} loggedIn={this.props.user} />
				</Grid.Column>
			);
		}

		return out;
	}

	render() {
		return (
			<Grid celled columns={16}>
				{this.createRows()}
			</Grid>
		);
	}
}

export default GridMap;
