import React, { Component } from 'react';
import Player from '../Player/Player'
import "./TapeDeck.css";



class TapeDeck extends Component {
    constructor(props) {
        super(props);
        this.togglePlayer = this.togglePlayer.bind(this);
        this.toggleRotate = this.toggleRotate.bind(this);
        this.state = {
            playerActive: false,
            rotateActive: false
        };
    }

    togglePlayer() {
        const playerState = this.state.playerActive;
        this.setState({ playerActive: !playerState });
    };

    toggleRotate() {
        const rotateState = this.state.rotateActive;
        this.setState({ rotateActive: !rotateState });
    }

    render() {
        return (
            <div 
                className={this.state.playerActive ? 'mainDown' : 'tapeDeck'} >
                <button onClick={this.togglePlayer} className="togglePlayer"></button>
                <div className="container">
                    <div className={this.state.rotateActive ? 'leftCircle leftCircleRotate' : 'leftCircle'}></div>
                    <div className={this.state.rotateActive ? 'rightCircle rightCircleRotate' : 'rightCircle'}></div>
                    <div className="transport">
                        <Player toggleRotate = {this.toggleRotate}/>

                    </div>
                </div>
            </div>
        )
    }
}
export default TapeDeck;