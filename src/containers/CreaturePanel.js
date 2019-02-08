import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Segment, Button, Form } from 'semantic-ui-react';
import Info from '../fragments/Info';

class CreaturePanel extends Component {
	state = {
		x: 1,
		y: 1
	}

	handleChange = e => this.setState({ [e.target.name]: Number(e.target.value) })

	handleClick = () => {
		this.props.handleClick("creatures", {
			...this.props, handleClick: undefined, position: this.state, positions: [ ...this.props.positions, this.state ]
		});
	}

	content = () => {
		if (this.props.name) {
			return (
				<Fragment>
					<Card.Content>
						<Card.Header>{this.props.name}</Card.Header>
						<Card.Meta>
							<span className="type">{this.props.creature_type}</span>
						</Card.Meta>
						<Info {...this.props} />
					</Card.Content>
					<Card.Content extra>
						<Icon name="fire" /> {this.props.challenge_rating}<br />
						{" "}<Icon name="arrow alternate circle right" /> {this.props.speed}<br />
						<Form onSubmit={e => e.preventDefault()}>
							<Form.Group>
								<Form.Field> 
									<label>X</label>
									<input
										type="number"
										name="x"
										value={this.state.x}
										onChange={this.handleChange}
									/>
								</Form.Field>
								<Form.Field> 
									<label>Y</label>
									<input
										type="number"
										name="y"
										value={this.state.y}
										onChange={this.handleChange}
									/>
								</Form.Field>
							</Form.Group>
						</Form>
						<Button fluid onClick={this.handleClick}>
							Add
						</Button>
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

function mapState({ creatures = [], selectedCreature }) {
	return { ...creatures.find(creature => creature.id === selectedCreature) };
}

export default connect(mapState)(CreaturePanel);
