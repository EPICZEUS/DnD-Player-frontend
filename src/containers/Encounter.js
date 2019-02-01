import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Header, Container, Button, Select } from 'semantic-ui-react';
import CharacterList from './CharacterList';
import CreatureList from './CreatureList';
import GridMap from '../components/GridMap';

class Encounter extends Component {
	state = {
		edit: false,
		value: null,
		name: "",
		descrption: "",
		characters: [],
		creatures: []
	}

	componentDidMount() {
		if (this.props.encounters.length) return;

		fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => this.props.dispatch({ type: "LOAD_ENCOUNTERS", payload }));
	}

	handleSave = () => {
		fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters", {
			headers: {
				Authorization: "Bearer " + localStorage.token,
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body: JSON.stringify(this.state)
		});
	}

	handleSwitch = () => {

	}

	top = () => {
		if (this.state.edit) {
			return (
				<Container>
					<Form>
						<Form.Field>
							<label>Name</label>
							<input
								placeholder="Name..."
								name="name"
								value={this.state.name}
							/>
						</Form.Field>
						<Form.TextArea
							label="Description"
							placeholder="Description..."
							name="description"
							value={this.state.description}
						/>
						<Form.Button primary>Save</Form.Button>
					</Form>
					<Button onClick={() => this.setState({ edit: !this.state.edit })}>Cancel</Button>
				</Container>
			);
		} else {
			return (
				<Container>
					<Select
						placeholder="Select encounter"
						options={this.props.options}
						value={this.state.value}
					/>
					<Header as="h3">{this.props.name}</Header>
					<p>{this.props.descrption}</p>
					{this.props.owner ? <Button onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button> : null}
				</Container>
			);
		}
	}

	render() {
		return (
			<Grid celled container>
				<Grid.Row>
					<Grid.Column width={3}>
						<CharacterList match={this.props.match}/>
					</Grid.Column>

					<Grid.Column width={10}>
						{this.top()}
						<GridMap />
					</Grid.Column>

					<Grid.Column width={3}>
						<CreatureList />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

function mapState({ encounters = []}) {
	return {
		encounters,
		options: encounters.map(encounter => ({
			key: encounter.id,
			value: encounter.id,
			text: encounter.name
		}))
	};
}

export default connect(mapState)(Encounter);
