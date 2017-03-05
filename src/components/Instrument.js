import React, { Component } from 'react';
import './Instrument.css';

class Instrument extends Component {
  constructor(props) {
    super(props);

    this.audioContext = props.context;
  }

  handleClick(e) {
    var oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = 300;
    oscillator.connect(this.audioContext.destination);
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
