import React from 'react';

import Keyboard from '../keyboard/pure';
import WaveformPicker from '../waveformPicker/pure';
import './styles.css';

/**
 * TODO: Generalise
 */
function Unit(props) {
  return (
    <div className="UnitContainer">
      <div className="UnitHeader">
        <p className="UnitLabel">Instrument</p>

        <div className="UnitHeaderSeparator"></div>

        <WaveformPicker
          onSelectWaveform={props.onSelectWaveform}
          selectedWaveform={props.selectedWaveform}
        />
      </div>

      <div className="UnitKeyboard">
        <Keyboard
          octaveCount={9}
          onKeyOn={props.noteOn}
          onKeyOff={props.noteOff}
          currentlyPlayingNote={props.currentlyPlayingNote}
        />
      </div>

    </div>
  );
}

export default Unit;
