import React, { Component, Fragment } from 'react';
import { Image } from 'semantic-ui-react';

class Token extends Component {
	content = () => {
		if (this.props.data) {
			// console.log(this.props.data, this.props.data.char_class ? "characters" : "creatures");

			return (
				<Fragment>
					<Image
						avatar
						src={this.props.data.user && this.props.data.user.avatar_url} 
						onClick={() => this.props.handleClick(this.props.data.char_class ? "characters" : "creatures", this.props.data.id)}
					/>
				</Fragment>
			);
		} else {
			return <Fragment />;
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
