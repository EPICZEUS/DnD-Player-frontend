import React, { Component, Fragment } from 'react';
import { Image } from 'semantic-ui-react';

class Token extends Component {
	content = () => {
		if (this.props.data) {
			return (
				<Fragment>
					<Image
						avatar
						src={this.props.data.user && this.props.data.user.avatar_url} 
						onClick={() => this.props.handleClick(this.props.data)}
					/>
				</Fragment>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				{this.content()}
			</div>
		);
	}
}

export default Token;
