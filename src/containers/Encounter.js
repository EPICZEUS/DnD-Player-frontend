import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Header, Container, Button, Select } from 'semantic-ui-react';
import CharacterList from './CharacterList';
import CreatureList from './CreatureList';
import GridMap from '../components/GridMap';
import TokenController from './TokenController';
import ws from '../ws';
import { LOAD_ENCOUNTERS } from '../constants';

class Encounter extends Component {
	state = {
		edit: false,
		name: "",
		description: "",
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
				this.props.dispatch({ type: LOAD_ENCOUNTERS, payload });
				this.setState({
					name: this.encounter.name || "",
					description: this.encounter.description || "",
					options: payload.map(encounter => ({
						key: encounter.id,
						value: encounter.id,
						text: encounter.name
					}))
				});
			});
	}

	handleSave = () => {
		if (this.encounter.id == null) {
			fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + localStorage.token,
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify({
					name: this.state.name,
					description: this.state.description,
					characters: this.characters,
					creatures: this.creatures
				})
			})
				.then(r => r.json())
				.then(data => {
					// console.log(data);
					// this.props.dispatch({ type: ADD_ENCOUNTER, payload: data.encounter });
					this.setState({
						name: data.encounter.name,
						description: data.encounter.description,
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
			// this.state.characters.forEach(char => {
			// 	const position = char.positions.find(pos => pos.encounter.id === this.state.id);

			// 	fetch("http://localhost:3000/api/v1/characters/" + char.id + "/positions/" + position.id, {
			// 		method: "PATCH",
			// 		headers: {
			// 			Authorization: "Bearer " + localStorage.token,
			// 			'Content-Type': "application/json",
			// 			'Accept': "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			x: position.x,
			// 			y: position.y
			// 		})
			// 	});
			// });

			// this.state.creatures.forEach(creature => {
			// 	const position = creature.positions.find(pos => pos.encounter.id === this.state.id);

			// 	fetch("http://localhost:3000/api/v1/creatures/" + creature.id + "/positions/" + position.id, {
			// 		method: "PATCH",
			// 		headers: {
			// 			Authorization: "Bearer " + localStorage.token,
			// 			'Content-Type': "application/json",
			// 			'Accept': "application/json"
			// 		},
			// 		body: JSON.stringify({
			// 			x: position.x,
			// 			y: position.y
			// 		})
			// 	});
			// });

			fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id + "/encounters/" + this.encounter.id, {
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
					// this.props.dispatch({ type: UPDATE_ENCOUNTER, payload: data.encounter });
					this.setState({ edit: false });
				});
		}
	}

	handleChange = e => this.setState({ [e.target.name]: e.target.value })

	handleAdd = (type, data) => {
		ws.send(JSON.stringify({
			command: "message",
			identifier: JSON.stringify({ channel: "AppChannel" }),
			data: JSON.stringify({
				action: "add",
				encounter_id: this.encounter.id,
				type,
				playable_id: data.id,
				position: data.positions.find(pos => !pos.encounter || pos.encounter.id === this.encounter.id)
			})
		}));
	}

	handleSelect = (_, { value }) => {
		fetch("http://localhost:3000/api/v1/campaigns/" + this.props.match.params.id, {
			method: "PATCH",
			headers: {
				Authorization: "Bearer " + localStorage.token,
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body: JSON.stringify({ selected_encounter: value })
		});
		this.setState({ ...this.props.encounters.find(encounter => encounter.id === value), activeToken: null });
	}

	handleTokenClick = (type, id) => this.setState({ activeToken: { type, id }});
	handleNoToken = () => this.setState({ activeToken: null });

	updateX = (type, id, val) => {
		const token = this[type].find(token => token.id === id);
		const position = token.positions.find(pos => !pos.encounter || pos.encounter.id === this.encounter.id);

		if ((position.x > 1 && val === -1) || (position.x < 16 && val === 1)) position.x += val;

		// const payload = { ...this.state };

		if (position.encounter && position.encounter.id) {
			fetch("http://localhost:3000/api/v1/" + type + "/" + token.id + "/positions/" + position.id, {
				method: "PATCH",
				headers: {
					Authorization: "Bearer " + localStorage.token,
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify(position)
			});
		} else {
			this.handleAdd(type, token);
		}

		// delete payload.activeToken;
		// delete payload.options;

		// this.props.dispatch({ type: UPDATE_ENCOUNTER, payload });
	}

	updateY = (type, id, val) => {
		const token = this[type].find(token => token.id === id);
		const position = token.positions.find(pos => !pos.encounter || pos.encounter.id === this.encounter.id);

		if ((position.y > 1 && val === -1) || (position.y < 16 && val === 1)) position.y += val;

		// const payload = { ...this.state };

		if (position.encounter && position.encounter.id) {
			fetch("http://localhost:3000/api/v1/" + type + "/" + token.id + "/positions/" + position.id, {
				method: "PATCH",
				headers: {
					Authorization: "Bearer " + localStorage.token,
					'Content-Type': "application/json",
					'Accept': "application/json"
				},
				body: JSON.stringify(position)
			});
		} else {
			this.handleAdd(type, token);
		}

		// delete payload.activeToken;
		// delete payload.options;

		// this.props.dispatch({ type: UPDATE_ENCOUNTER, payload });
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
			// console.log(this.state.activeToken, this[this.state.activeToken && this.state.activeToken.type]);

			// if (this.state.activeToken) console.log("Found Character", this[this.state.activeToken.type].find(token => token.id === this.state.activeToken.id));

			return (
				<Container>
					<TokenController
						updateX={this.updateX}
						updateY={this.updateY}
						handleToken={this.handleNoToken}
						data={this.state.activeToken && this.props[this.state.activeToken.type].find(token => token.id === this.state.activeToken.id)}
						owner={this.props.owner}
						loggedIn={this.props.user}
						encounter_id={this.encounter.id}
					/>
					{this.props.owner ? (
						<Select
							placeholder="Select encounter"
							options={this.state.options}
							onChange={this.handleSelect}
							value={this.props.currentEncounter}
						/>
					) : null}
					<Header as="h3">{this.encounter.name}</Header>
					<p>{this.encounter.description}</p>
					{this.props.owner ? (
						<Button.Group vertical>
							<Button primary onClick={() => this.setState({ edit: !this.state.edit })}>Edit</Button>
							{this.props.currentEncounter ? (
								<Fragment>
									<Button onClick={() => {
										this.characters.forEach(char => {
											char.positions = char.positions.filter(pos => pos.encounter);
										});

										this.creatures.forEach(creature => {
											creature.positions = creature.positions.filter(pos => pos.encounter);
										});

										this.setState({
											activeToken: null,
											name: "",
											description: ""
										});

										fetch("http://localhost:3000/api/v1" + this.props.match.url, {
											method: "PATCH",
											headers: {
												Authorization: "Bearer " + localStorage.token,
												'Content-Type': "application/json",
												'Accept': "application/json"
											},
											body: JSON.stringify({ selected_encounter: null })
										});
									}}>
										New
									</Button>
									<Button negative onClick={() => {
										this.setState({ options: this.state.options.filter(opt => opt.value !== this.props.currentEncounter) });
										fetch("http://localhost:3000/api/v1" + this.props.match.url + "/encounters/" + this.props.currentEncounter, { method: "DELETE", headers: { Authorization: "Bearer " + localStorage.token }});
									}}>
										Delete
									</Button>
								</Fragment>
							) : null}
						</Button.Group>
					) : null}
				</Container>
			);
		}
	}

	render() {
		this.encounter = this.props.encounters.find(enc => enc.id === this.props.currentEncounter) || {};
		this.characters = this.props.characters.filter(char => char.positions.some(pos => pos.encounter && this.encounter.id ? pos.encounter.id === this.encounter.id : !pos.encounter));
		this.creatures = this.props.creatures.filter(crea => crea.positions.some(pos => pos.encounter && this.encounter.id ? pos.encounter.id === this.encounter.id : !pos.encounter));

		// console.log(this.encounter);

		return (
			<Grid celled container>
				<Grid.Row>
					<Grid.Column width={3}>
						<CharacterList
							owner={this.props.owner}
							match={this.props.match}
							history={this.props.history}
							handleClick={this.handleAdd}
							active={this.characters}
						/>
					</Grid.Column>

					<Grid.Column width={10}>
						{this.top()}
						<GridMap
							user={this.props.user}
							encounter_id={this.encounter.id}
							creatures={this.creatures}
							characters={this.characters}
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

function mapState({ encounters = [], creatures = [], characters = [], user }) {
	return {
		encounters,
		creatures,
		characters,
		user
	};
}

export default connect(mapState)(Encounter);
