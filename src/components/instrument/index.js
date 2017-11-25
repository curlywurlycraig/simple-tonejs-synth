import React, { Component } from 'react';
import './styles.css';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick(e) {
    var oscillator = this.props.audio.context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 300;
    oscillator.connect(this.props.audio.masterGainNode);
    oscillator.start();
  }

  render() {
    return (
      <div className="InstrumentContainer">
        <div className="InstrumentHeader">
          <p>Instrument</p>
        </div>

        <div className="InstrumentBody">
          <button onClick={this.handleClick.bind(this)}>
            Click me.
          </button>
        </div>

      </div>
    );
  }
}

export default Instrument;
