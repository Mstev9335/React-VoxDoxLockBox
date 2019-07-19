import React, { Component } from 'react';
import Player from '../Player/Player'
import "./TapeDeck.css";



class TapeDeck extends Component {

    render() {
        return (
            <div className="tapeDeck">
                <div className="container">
                    <div className="leftCircle"></div>
                    <div className="rightCircle"></div>
                <div className="transport">
                {/* passing props to player so it can access the source file */}
                    <Player value= {this.props.passedVal}/>
           
                    {/* <Player /> */}
                    {/* <div className="player">
                        <audio className="player_video viewer" id="player" src="testing" type="audio/mpeg" ref={(el) => this.audio = el }></audio>
                        <div className="player_controls">
                            <div className="progress">
                                <div className="progress_filled"></div>
                            </div>
                            <button className="player_button toggle" title="Toggle Play" onClick={this.togglePlay}>&#9658;</button>
                            <input type="range" name="volume" className="player_slider" min="0" max="1" step="0.05" value="1" />
                                <input type="range" name="playbackRate" className="player_slider" min="0.5" max="2" step="0.1" value="1" />
                                    <button data-skip="-10" className="player_button">« 10s</button>
                                    <button data-skip="25" className="player_button">25s »</button>
                        </div>
                    </div> */}
                </div>
                </div>
                <button onClick={this.handleEvent} className="togglePlayer"><i className="fas fa-clipboard-list">
                  </i></button>
            </div>

        )
    }
}  
  export default TapeDeck;