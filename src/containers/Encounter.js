import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Header, Container, Button, Select } from 'semantic-ui-react';
import CharacterList from './CharacterList';
import CreatureList from './CreatureList';
import GridMap from '../components/GridMap';
import TokenController from './TokenController';

class Encounter extends Component {
	state = {
		edit: false,
		name: "",
		description: "",
		characters: [],
		creatures: [],
		activeToken: null,
		options: this.props.encounters.map(encounter => ({
			key: encounter.id,
			value: encounter.id,
			text: encounter.name
		}))
	}

	componentDidMount() {
		if (this.props.encounters.length) return;

		fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters", { headers: { Authorization: "Bearer " + localStorage.token }})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: "LOAD_ENCOUNTERS", payload });
				this.setState({
					options: payload.map(encounter => ({
						key: encounter.id,
						value: encounter.id,
						text: encounter.name
					}))
				});
			});
	}

	handleSave = () => {
		if (this.state.id == null) {
			fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + localStorage.token,
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify(this.state)
			})
				.then(r => r.json())
				.then(data => {
					console.log(data);
					this.props.dispatch({ type: "ADD_ENCOUNTER", payload: data.encounter });
					this.setState({
						...data.encounter,
						activeToken: null,
						options: [
							...this.state.options,
							{
								key: data.encounter.id,
								value: data.encounter.id,
								text: data.encounter.name
							}
						],
						edit: false
					});
				});
		} else {
			this.state.characters.forEach(char => {
				const position = char.positions.find(pos => pos.encounter.id === this.state.id);

				fetch("http://localhost:3000/api/v1/characters/" + char.id + "/positions/" + position.id, {
					method: "PATCH",
					headers: {
						Authorization: "Bearer " + localStorage.token,
						'Content-Type': "application/json",
						'Accept': "application/json"
					},
					body: JSON.stringify({
						x: position.x,
						y: position.y
					})
				});
			});

			this.state.creatures.forEach(creature => {
				const position = creature.positions.find(pos => pos.encounter.id === this.state.id);

				fetch("http://localhost:3000/api/v1/creatures/" + creature.id + "/positions/" + position.id, {
					method: "PATCH",
					headers: {
						Authorization: "Bearer " + localStorage.token,
						'Content-Type': "application/json",
						'Accept': "application/json"
					},
					body: JSON.stringify({
						x: position.x,
						y: position.y
					})
				});
			});

			fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters/" + this.state.id, {
				method: "PATCH",
				headers: {
					Authorization: "Bearer " + localStorage.token,
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify(this.state)
			})
				.then(r => r.json())
				.then(data => {
					this.props.dispatch({ type: "UPDATE_ENCOUNTER", payload: data.encounter });
					this.setState({ edit: false });
				});
		}
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleAdd = (prop, data) => {
		data.position.encounter = { id: this.state.id };
		this.setState({ [prop]: [ ...this.state[prop], data ]});
	}

	handleSelect = (_, { value }) => {
		this.setState({ ...this.props.encounters.find(encounter => encounter.id === value), activeToken: null });
	}

	handleTokenClick = obj => this.setState({ activeToken: obj })

	updateX = (type, id, val) => {
		const token = this.state[type].find(token => token.id === id);
		const position = token.positions.find(pos => pos.encounter.id === this.state.id);

		if ((position.x > 1 && val === -1) || (position.x < 16 && val === 1)) position.x += val;

		const payload = { ...this.state };

		delete payload.activeToken;
		delete payload.options;

		this.props.dispatch({ type: "UPDATE_ENCOUNTER", payload });
	}

	updateY = (type, id, val) => {
		const token = this.state[type].find(token => token.id === id);
		const position = token.positions.find(pos => pos.encounter.id === this.state.id);

		if ((position.y > 1 && val === -1) || (position.y < 16 && val === 1)) position.y += val;

		const payload = { ...this.state };

		delete payload.activeToken;
		delete payload.options;

		this.props.dispatch({ type: "UPDATE_ENCOUNTER", payload });
	}

	top = () => {
		if (this.state.edit) {
			return (
				<Container>
					<Form onSubmit={this.handleSave}>
						<Form.Field>
							<label>Name</label>
							<input
								name="name"
								placeholder="Name..."
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.TextArea
							label="Description"
							name="description"
							placeholder="Description..."
							value={this.state.description}
							onChange={this.handleChange}
						/>
						<Form.Button primary>Save</Form.Button>
					</Form>
					<Button onClick={() => this.setState({ edit: !this.state.edit })}>Cancel</Button>
				</Container>
			);
		} else {
			return (
				<Container>
					<TokenController
						updateX={this.updateX}
						updateY={this.updateY}
						encounter_id={this.state.id}
						owner={this.props.owner}
						{...this.state.activeToken}
					/>
					<Select
						placeholder="Select encounter"
						options={this.state.options}
						onChange={this.handleSelect}
						value={this.state.id}
					/>
					<Header as="h3">{this.state.name}</Header>
					<p>{this.state.description}</p>
					{this.props.owner ? (
						<Button.Group vertical>
							<Button primary onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
							<Button onClick={() => {
								this.state.characters.forEach(char => {
									char.positions = char.positions.filter(pos => pos.encounter.id);
								});

								this.state.creatures.forEach(creature => {
									creature.positions = creature.positions.filter(pos => pos.encounter.id);
								});

								this.setState({
									id: null,
									name: "",
									description: "",
									characters: [],
									creatures: [],
									activeToken: null
								})
							}}>
								New
							</Button>
						</Button.Group>
					) : null}
				</Container>
			);
		}
	}

	render() {
		return (
			<Grid celled container>
				<Grid.Row>
					<Grid.Column width={3}>
						<CharacterList 
							match={this.props.match}
							history={this.props.history}
							handleClick={this.handleAdd}
							active={this.state.characters}
						/>
					</Grid.Column>

					<Grid.Column width={10}>
						{this.top()}
						<GridMap
							user={this.props.user}
							encounter_id={this.state.id}
							creatures={this.state.creatures}
							characters={this.state.characters}
							handleClick={this.handleTokenClick}
						/>
					</Grid.Column>

					{
						this.props.owner ? (
							<Grid.Column width={3}>
								<CreatureList handleClick={this.handleAdd} />
							</Grid.Column>
						) : null
					}
				</Grid.Row>
			</Grid>
		);
	}
}

function mapState({ encounters = [], user }) {
	return { encounters, user };
}

export default connect(mapState)(Encounter);
