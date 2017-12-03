import React from 'react';

import './styles.css';

// note the empty string in the black notes. This is to just assist in drawing the gap where
// there is no such note.
const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotes = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

class Keyboard extends React.PureComponent {
  render() {
    const whiteKeys = [];
    const blackKeys = [];

    [...Array(this.props.octaveCount).keys()].map(octaveIndex => {
      whiteKeys.push(this.displayWhiteKeys(octaveIndex));
      blackKeys.push(this.displayBlackKeys(octaveIndex));
    });

    return (
      <div className="KeyboardContainer">
        <div className="KeyboardWhiteKeysContainer">
          { whiteKeys }
        </div>

        <div className="KeyboardBlackKeysContainer">
          { blackKeys }
        </div>
      </div>
    )
  }

  displayWhiteKeys(octaveIndex) {
    return whiteNotes.map(noteName => {
      return <a
        className="KeyboardWhiteKey"
        onMouseDown={() => this.props.onKeyOn(noteName + octaveIndex)}
        onMouseUp={() => this.props.onKeyOff(noteName + octaveIndex)}>
        { noteName + octaveIndex }
      </a>
    })
  }

  displayBlackKeys(octaveIndex) {
    return blackNotes.map(noteName => {
      if (noteName) {
        return <a
          className="KeyboardBlackKey"
          onMouseDown={() => this.props.onKeyOn(noteName + octaveIndex)}
          onMouseUp={() => this.props.onKeyOff(noteName + octaveIndex)}>
        </a>
      } else {
        return <div className="KeyboardBlackKey__Hidden">
        </div>;
      }
    });
  }
}

export default Keyboard;