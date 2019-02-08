import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Container } from 'semantic-ui-react';
import { SPEED, HIT_DICE } from '../data';

let last = [];

class CharacterForm extends Component {
	state = {
		name: "",
		level: 1,
		char_class: "",
		race: "",
		speed: "",
		alignment: "",
		hp: 0,
		armor_class: 0,
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
		calc: false
	}

	classOptions = [
		{
			value: "Barbarian",
			text: "Barbarian"
		},
		{
			value: "Bard",
			text: "Bard"
		},
		{
			value: "Cleric",
			text: "Cleric"
		},
		{
			value: "Druid",
			text: "Druid"
		},
		{
			value: "Fighter",
			text: "Fighter"
		},
		{
			value: "Monk",
			text: "Monk"
		},
		{
			value: "Paladin",
			text: "Paladin"
		},
		{
			value: "Ranger",
			text: "Ranger"
		},
		{
			value: "Rogue",
			text: "Rogue"
		},
		{
			value: "Sorcerer",
			text: "Sorcerer"
		},
		{
			value: "Warlock",
			text: "Warlock"
		},
		{
			value: "Wizard",
			text: "Wizard"
		}
	]

	raceOptions = [
		{
			value: "Aasimar",
			text: "Aasimar"
		},
		{
			value: "Bugbear",
			text: "Bugbear"
		},
		{
			value: "Dragonborn",
			text: "Dragonborn"
		},
		{
			value: "Dwarf",
			text: "Dwarf"
		},
		{
			value: "Elf",
			text: "Elf"
		},
		{
			value: "Firbolg",
			text: "Firbolg"
		},
		{
			value: "Genasi",
			text: "Genasi"
		},
		{
			value: "Gith",
			text: "Gith"
		},
		{
			value: "Gnome",
			text: "Gnome"
		},
		{
			value: "Goblin",
			text: "Goblin"
		},
		{
			value: "Goliath",
			text: "Goliath"
		},
		{
			value: "Hobgoblin",
			text: "Hobgoblin"
		},
		{
			value: "Half-elf",
			text: "Half-elf"
		},
		{
			value: "Halfling",
			text: "Halfling"
		},
		{
			value: "Human",
			text: "Human"
		},
		{
			value: "Kenku",
			text: "Kenku"
		},
		{
			value: "Kobold",
			text: "Kobold"
		},
		{
			value: "Lizardfolk",
			text: "Lizardfolk"
		},
		{
			value: "Orc",
			text: "Orc"
		},
		{
			value: "Tabaxi",
			text: "Tabaxi"
		},
		{
			value: "Tiefling",
			text: "Tiefling"
		},
		{
			value: "Tortle",
			text: "Tortle"
		},
		{
			value: "Triton",
			text: "Triton"
		},
		{
			value: "Yuan-Ti Pureblood",
			text: "Yuan-Ti Pureblood"
		},
	]

	alignOptions = [
		{
			value: "Lawful Good",
			text: "Lawful Good"
		},
		{
			value: "Neutral Good",
			text: "Neutral Good"
		},
		{
			value: "Chaotic Good",
			text: "Chaotic Good"
		},
		{
			value: "Lawful Neutral",
			text: "Lawful Neutral"
		},
		{
			value: "True Neutral",
			text: "True Neutral"
		},
		{
			value: "Chaotic Neutral",
			text: "Chaotic Neutral"
		},
		{
			value: "Lawful Evil",
			text: "Lawful Evil"
		},
		{
			value: "Neutral Evil",
			text: "Neutral Evil"
		},
		{
			value: "Chaotic Evil",
			text: "Chaotic Evil"
		},
	]

	handleChange = e => {
		e.persist();

		this.setState({ [e.target.name]: e.target.value }, () => {
			const newState = {};

			if (this.state.calc && e.target.name === "level") {
				if (e.target.value - this.state.level === 1) {
					last.push(Math.floor(Math.random() * HIT_DICE[this.state.char_class]) + 1 + Math.floor((this.state.con - 10) / 2));

					newState.hp = Number(this.state.hp) + last[last.length - 1];
				} else if (this.state.level - e.target.value === 1 && last.length) {
					newState.hp = Number(this.state.hp) - last.pop();
				} else {
					newState.hp = this.rollHealth(HIT_DICE[this.state.char_class], this.state.con);
					last = [];
				}
			}

			this.setState(newState);
		});
	}

	rollHealth = (die, con) => {
		const score = Math.floor((con - 10) / 2);
		let hp = die + score;

		for (let i = 0; i < Number(this.state.level) - 1; i++) hp += Math.floor(Math.random() * die) + 1 + score;

		return hp;
	}

	handleToggle = () => {
		const rollStat = () => {
			let stat = 0;

			for (let i = 0; i < 3; i++) stat += Math.floor(Math.random() * 6) + 1;

			return stat;
		};

		const newState = { calc: !this.state.calc };

		if (newState.calc) {
			newState.str = rollStat();
			newState.dex = rollStat();
			newState.con = rollStat();
			newState.int = rollStat();
			newState.wis = rollStat();
			newState.cha = rollStat();
			newState.hp = this.rollHealth(HIT_DICE[this.state.char_class], newState.con) || 0;
		} else {
			newState.str = 0;
			newState.dex = 0;
			newState.con = 0;
			newState.int = 0;
			newState.wis = 0;
			newState.cha = 0;
			newState.hp = 0;
		}

		this.setState(newState);
	}

	handleSubmit = () => {
		const body = JSON.stringify({ ...this.state, campaign_id: this.props.match.params.campaign_id });

		fetch("http://localhost:3000/api/v1/characters", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
				'Content-Type': "application/json",
				'Accept': "application/json"
			},
			body
		})
			.then(r => r.json())
			.then(payload => {
				this.props.dispatch({ type: "ADD_CHARACTER", payload });
				this.props.history.push("/campaigns/" + this.props.match.params.campaign_id);
			});
	}

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group style={{ width: "100%" }}>
						<Form.Field>
							<label>Name</label>
							<input
								type="text"
								placeholder="Name..."
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Select
							label="Alignment"
							options={this.alignOptions}
							placeholder="Select Alignment"
							onChange={(_, { value }) => this.setState({ alignment: value })}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Field>
							<label>Level</label>
							<input
								type="number"
								placeholder="Level..."
								name="level"
								value={this.state.level}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Select
							label="Class"
							options={this.classOptions}
							placeholder="Select Class"
							onChange={(_, { value }) => this.setState({ char_class: value, hp: this.state.calc ? this.rollHealth(HIT_DICE[value], this.state.con) : this.state.hp })}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Select
							label="Race"
							options={this.raceOptions}
							placeholder="Select Race"
							onChange={(_, { value }) => this.setState({ race: value, speed: SPEED[value] })}
						/>
						<Form.Field>
							<label>Speed</label>
							<input
								readOnly
								type="text"
								placeholder="Speed..."
								name="speed"
								value={this.state.speed}
								onChange={this.handleChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Checkbox
						label="Calculate Stats Automatically"
						checked={this.state.calc}
						onChange={this.handleToggle}
					/>
					<Form.Group>
						<Form.Field>
							<label>HP</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="HP..."
								name="hp"
								value={this.state.hp}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Armor Class</label>
							<input
								type="number"
								placeholder="Armor Class..."
								name="armor_class"
								value={this.state.armor_class}
								onChange={this.handleChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field>
							<label>Strength</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Strength..."
								name="str"
								value={this.state.str}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Dexterity</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Dexterity..."
								name="dex"
								value={this.state.dex}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Constitution</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Constitution..."
								name="con"
								value={this.state.con}
								onChange={this.handleChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Group>
						<Form.Field>
							<label>Intelligence</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Intelligence..."
								name="int"
								value={this.state.int}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Wisdom</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Wisdom..."
								name="wis"
								value={this.state.wis}
								onChange={this.handleChange}
							/>
						</Form.Field>
						<Form.Field>
							<label>Charisma</label>
							<input
								readOnly={this.state.calc}
								type="number"
								placeholder="Charisma..."
								name="cha"
								value={this.state.cha}
								onChange={this.handleChange}
							/>
						</Form.Field>
					</Form.Group>
					<Form.Button>Create Character</Form.Button>
				</Form>
			</Container>
		);
	}
}

export default connect()(CharacterForm);
