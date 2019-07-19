
import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
  constructor() {
    super();

    this.state = {
      file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      is_playing: false,
      progress: 0,
      in_set_progress_mode: false,
      
    };

    this.is_progress_dirty = false;
    this.interval_id = setInterval(this.onUpdate.bind(this), 250);
  }

  onUpdate() {
    let player = this.refs.player;
    if (player && !this.is_progress_dirty) {
      this.setState({
        progress: player.currentTime / player.duration
      });
    }
  }

  

  togglePlay() {
    this.setState({ is_playing: !this.state.is_playing });
    // logging the passed state value
    console.log(this.props.value);
  }

  startSetProgress(e) {
    this.setState({
      in_set_progress_mode: true
    });
    this.setProgress(e)
  }

  stopSetProgress(e) {
    this.setState({
      in_set_progress_mode: false
    });
    this.setProgress(e);
  }

  setProgress(e) {
    if (this.state.in_set_progress_mode) {
      var progress = (e.clientX - offsetLeft(this.refs.progress_bar)) / this.refs.progress_bar.clientWidth;
      this.setState({
        progress: progress,
      });
      this.is_progress_dirty = true;
    }
  }

  render() {
    let currentTime = 0;
    let totalTime = 0;

    if (this.refs.player) {
      const player = this.refs.player;

      if (player.paused) {
        if (this.state.is_playing) {
          player.play();
        }
      }
      else if (!this.state.is_playing) {
        player.pause();
      }

      if (this.is_progress_dirty) {
        this.is_progress_dirty = false;

        player.currentTime = player.duration * this.state.progress;
      }


      currentTime = player.currentTime;
      totalTime = player.duration;
    }

    var playerClassName = {
      "fa": true,
      "fa-play": !this.state.is_playing,
      "fa-pause": this.state.is_playing
    }

    return (
      <div className="player">
        <div className="controls">
          <a href="javascript:void();">
            <i className="fas fa-chevron-left"></i>
          </a>
          <a onClick={this.togglePlay.bind(this)}>
            <i className={classnames(playerClassName)} aria-hidden="true"></i>
          </a>
          <a href="javascript:void();">
            <i className="fas fa-chevron-right"></i>
          </a>
        </div>
        <div
          onMouseDown={this.startSetProgress.bind(this)}
          onMouseMove={this.setProgress.bind(this)}
          onMouseLeave={this.stopSetProgress.bind(this)}
          onMouseUp={this.stopSetProgress.bind(this)}
          className="progress">

          <div ref="progress_bar" className="bar">
            <div style={{ width: (this.state.progress * 100) + '%' }}></div>
          </div>
        </div>
        <div className="time">
          {formatTime(currentTime)} ** of ** {formatTime(totalTime)}
        </div>
        <audio ref="player">
          <source src={this.state.file} autoPlay="true" />
        </audio>
      </div>
    );
  }
}

function formatTimeToNumber(num) {
  let str = num + '';
  if (str.length == 1) {
    return '0' + str;
  }
  if (str.length == 0) {
    return '00';
  }
  return str;
}

function formatTime(s) {
  let total_seconds = Math.floor(s);
  let hours = Math.floor(total_seconds / 3600);
  let minutes = Math.floor(total_seconds / 60) - hours * 60;
  let seconds = total_seconds - minutes * 60 - hours * 3600;

  if (hours) {
    return hours + ':' + formatTimeToNumber(minutes) + ':' + formatTimeToNumber(seconds);
  }

  return formatTimeToNumber(minutes) + ':' + formatTimeToNumber(seconds);
}

function offsetLeft(el) {
  var left = 0;
  while (el && el !== document) {
    left += el.offsetLeft;
    el = el.offsetParent;
  }
  return left;
}

function classnames(obj) {
  var css = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      css.push(key);
    }
  });
  return css.join(' ');
}


export default Player;