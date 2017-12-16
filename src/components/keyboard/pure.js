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

    [...Array(this.props.octaveCount).keys()].forEach(octaveIndex => {
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
      let className = "KeyboardWhiteKey";
      if (noteName + octaveIndex === this.props.currentlyPlayingNote) {
        className += ' KeyboardWhiteKey--Pressed';
      }

      return <a
        className={className}
        onMouseDown={() => this.props.onKeyOn(noteName + octaveIndex)}
        onMouseUp={() => this.props.onKeyOff(noteName + octaveIndex)}>
        { noteName + octaveIndex }
      </a>
    })
  }

  displayBlackKeys(octaveIndex) {
    return blackNotes.map(noteName => {
      let className = "KeyboardBlackKey";
      if (noteName + octaveIndex === this.props.currentlyPlayingNote) {
        className += ' KeyboardBlackKey--Pressed';
      }
      if (noteName) {
        return <a
          className={className}
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