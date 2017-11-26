import React, { Component } from 'react';

import Keyboard from '../keyboard/pure';
import './styles.css';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  onKeyOn(keyIndex) {
  }

  onKeyOff(keyIndex) {
  }

  render() {
    return (
      <div className="InstrumentContainer">
        <div className="InstrumentHeader">
          <p className="InstrumentLabel">Instrument</p>
        </div>

        <div className="InstrumentKeyboard">
          <Keyboard
            onKeyOn={this.onKeyOn.bind(this)}
            onKeyOff={this.onKeyOff.bind(this)}
          />
        </div>

      </div>
    );
  }
}

export default Instrument;
