import React, { Component } from 'react';


export class ToggleButton extends Component {
    render() {
        return (
            <div    className={ this.props.className }
                    onClick={ this.props.toggleClassName }>
                { this.props.children }
            </div>
        )
    }
}

export default ToggleButton; 
