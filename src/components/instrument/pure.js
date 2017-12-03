import React, { Component } from 'react';

import Keyboard from '../keyboard/pure';
import WaveformPicker from '../waveformPicker/pure';
import './styles.css';

function Instrument(props) {
  return (
    <div className="InstrumentContainer">
      <div className="InstrumentHeader">
        <p className="InstrumentLabel">Instrument</p>

        <div className="InstrumentHeaderSeparator"></div>

        <WaveformPicker
          onSelectWaveform={props.onSelectWaveform}
          selectedWaveform={props.selectedWaveform}
        />
      </div>

      <div className="InstrumentKeyboard">
        <Keyboard
          octaveCount={9}
          onKeyOn={props.noteOn}
          onKeyOff={props.noteOff}
        />
      </div>

    </div>
  );
}

export default Instrument;
