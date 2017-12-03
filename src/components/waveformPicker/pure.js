import React from 'react';

function waveformPicker(props) {
  return (
    <div className="WaveformPickerContainer">
      <a onClick={() => props.onSelectWaveform('sine')}>S</a>
      <a onClick={() => props.onSelectWaveform('triangle')}>T</a>
      <a onClick={() => props.onSelectWaveform('sawtooth')}>saw</a>
      <a onClick={() => props.onSelectWaveform('square')}>square</a>
    </div>
  );
}

export default waveformPicker;