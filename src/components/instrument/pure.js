import React, { Component } from 'react';

import Keyboard from '../keyboard/pure';
import './styles.css';

class Instrument extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  handleClick(e) {
    this.props.createInstrument();
  }

  render() {
    return (
      <div className="InstrumentContainer">
        <div className="InstrumentHeader">
          <p>Instrument</p>
        </div>

        <div className="InstrumentKeyboard">
          <Keyboard
            onClickKey={this.handleClick.bind(this)}
          />
        </div>

      </div>
    );
  }
}

export default Instrument;
