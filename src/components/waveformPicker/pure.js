import React from 'react';

import sineIcon from './icons/sineIcon.svg';
import triangleIcon from './icons/triangleIcon.svg';
import sawtoothIcon from './icons/sawtoothIcon.svg';
import squareIcon from './icons/squareIcon.svg';
import './styles.css';

const waveformOptions = [
  {
    name: 'sine',
    icon: sineIcon,
  },
  {
    name: 'triangle',
    icon: triangleIcon,
  },
  {
    name: 'sawtooth',
    icon: sawtoothIcon,
  },
  {
    name: 'square',
    icon: squareIcon,
  }
];

function waveformPicker(props) {
  return (
    <div className="WaveformPickerContainer">
      {
        waveformOptions.map(waveformOption => {
          const isCurrentlySelected = waveformOption.name === props.selectedWaveform;

          let className = "WaveformPickerOption";
          if (isCurrentlySelected) {
            className += " WaveformPickerOption__Selected";
          }

          return (
            <a
              className={className}
              onClick={() => props.onSelectWaveform(waveformOption.name)}>
              <img src={waveformOption.icon}/>
            </a>
          );
        })
      }
    </div>
  );
}

export default waveformPicker;