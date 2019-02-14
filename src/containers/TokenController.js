import React, { Component, Fragment } from 'react';
import { Card, Icon, Segment, Image, Grid, Label, Button } from 'semantic-ui-react';
import ws from '../ws';

class TokenController extends Component {
	content = () => {
		const canMove = this.props.owner || ((this.props.data && this.props.data.user) && this.props.data.user.id === this.props.loggedIn.id);
		
		if (this.props.data) {
			const position = this.props.data.positions.find(pos => this.props.encounter_id ? pos.encounter.id === this.props.encounter_id : !pos.encounter);
			const type = this.props.data.char_class ? "characters" : "creatures";

			return (
				<Fragment>
					<Image src={this.props.data.user && this.props.data.user.avatar_url} />
					<Card.Content>
						<Card.Header>{this.props.data.name}</Card.Header>
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
												<Icon link name="arrow left" onClick={() => this.props.updateX(type, this.props.data.id, -1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow up" onClick={() => this.props.updateY(type, this.props.data.id, 1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow down" onClick={() => this.props.updateY(type, this.props.data.id, -1)} />
											</Grid.Column>
											<Grid.Column>
												<Icon link name="arrow right" onClick={() => this.props.updateX(type, this.props.data.id, 1)} />
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
								<Button fluid onClick={() => {
									this.props.handleToken();
									
									if (position.id) {
										fetch("http://localhost:3000/api/v1/" + type + "/" + this.props.data.id + "/positions/" + position.id, { method: "DELETE", headers: { Authorization: "Bearer " + localStorage.token }});
									} else {
										ws.send(JSON.stringify({
											command: "message",
											identifier: JSON.stringify({ channel: "AppChannel" }),
											data: JSON.stringify({
												action: "remove",
												encounter_id: this.props.encounter_id,
												type,
												playable_id: this.props.data.id
											})
										}));
									}
								}}>
									Remove from encounter
								</Button>
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
