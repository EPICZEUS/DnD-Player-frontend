import React, { Component, Fragment } from 'react';
import { Card, Icon, Segment, Image, Grid, Label, Button } from 'semantic-ui-react';

class TokenController extends Component {
	content = () => {
		const canMove = this.props.owner || (this.props.user && this.props.user.id === this.props.loggedIn.id);
		
		if (this.props.name) {
			const position = this.props.positions.find(pos => pos.encounter.id === this.props.encounter_id);
			const type = this.props.char_class ? "characters" : "creatures";

			return (
				<Fragment>
					<Image src={this.props.user && this.props.user.avatar_url} />
					<Card.Content>
						<Card.Header>{this.props.name}</Card.Header>
						<Card.Meta>
							<Label>
								X
								<Label.Detail>
									{position.x}
								</Label.Detail>
							</Label>
							<Label>
								Y
								<Label.Detail>
									{position.y}
								</Label.Detail>
							</Label>
						</Card.Meta>
						{
							canMove ? (
								<Card.Description>
									<Grid columns={4}>
										<Grid.Row>
											<Grid.Column>
												<Icon link name="arrow left" onClick={() => this.props.updateX(type, this.props.id, -1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow up" onClick={() => this.props.updateY(type, this.props.id, 1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow down" onClick={() => this.props.updateY(type, this.props.id, -1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow right" onClick={() => this.props.updateX(type, this.props.id, 1)} />
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Card.Description>
							) : null
						}
					</Card.Content>
					{
						canMove ? (
							<Card.Content extra>
								<Button fluid>Remove from encounter</Button>
							</Card.Content>
						) : null
					}
				</Fragment>
			);
		} else {
			return <Segment placeholder />;
		}
	}

	render() {
		return (
			<Card style={{ float: "right" }}>
				{this.content()}
			</Card>
		);
	}
}

export default TokenController;
