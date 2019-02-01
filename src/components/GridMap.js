import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class GridMap extends Component {
	createRows = () => {
		const out = [];

		for (let i = 0; i < 16; i++) {
			out.push(
				<Grid.Row style={{ height: 50 }} key={i}>
					{this.createColumns()}
				</Grid.Row>
			);
		}

		return out;
	}

	createColumns = () => {
		const out = [];

		for (let i = 0; i < 16; i++) {
			out.push(
				<Grid.Column style={{ width: 50 }} width={1} key={i}>
					<div />
				</Grid.Column>
			);
		}

		return out;
	}

	render() {
		return (
			<Grid celled>
				{this.createRows()}
			</Grid>
		);
	}
}

export default GridMap;
