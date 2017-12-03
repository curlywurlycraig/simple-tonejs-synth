import React, { Component } from 'react';

import Keyboard from '../keyboard/pure';
import './styles.css';

function Instrument(props) {
  return (
    <div className="InstrumentContainer">
      <div className="InstrumentHeader">
        <p className="InstrumentLabel">Instrument</p>
      </div>

      <div className="InstrumentKeyboard">
        <Keyboard
          onKeyOn={props.noteOn}
          onKeyOff={props.noteOff}
        />
      </div>

    </div>
  );
}

export default Instrument;
