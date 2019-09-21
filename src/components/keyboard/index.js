import React from 'react';

import './styles.css';
import { characterToNoteNameMap } from '../../utils/qwerty';

const DEFAULT_LOWEST_OCTAVE = 0;

// note the empty string in the black notes. This is to just assist in drawing the gap where
// there is no such note.
const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotes = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

class Keyboard extends React.PureComponent {
  render() {
    const whiteKeys = [];
    const blackKeys = [];

    [...Array(this.props.octaveCount).keys()].forEach(octaveIndex => {
      const lowestOctave = this.props.lowestOctave || DEFAULT_LOWEST_OCTAVE;
      whiteKeys.push(this.displayWhiteKeys(octaveIndex + lowestOctave));
      blackKeys.push(this.displayBlackKeys(octaveIndex + lowestOctave));
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
      const currentNote = noteName + octaveIndex;

      if (this.props.currentlyPlayingNotes.includes(currentNote)) {
        className += ' KeyboardWhiteKey--Pressed';
      }

      return <a
        className={className}
        onMouseDown={() => this.props.onKeyOn(currentNote)}
        onTouchStart={e => {
          // Don't allow the mouse event to fire on a touch screen, as it will play the sound twice.
          this.props.onKeyOn(currentNote);
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={() => this.props.onKeyOff(currentNote)}
        onTouchEnd={e => {
          this.props.onKeyOff(currentNote);
          e.preventDefault();
          e.stopPropagation();
        }}>
        {
          octaveIndex === this.props.lowestOctave ?
            <p className="KeyboardWhiteKey__Text">{characterToNoteNameMap[noteName]}</p>
          :
            null
        }
      </a>
    })
  }

  displayBlackKeys(octaveIndex) {
    return blackNotes.map(noteName => {
      let className = "KeyboardBlackKey";
      const currentNote = noteName + octaveIndex;

      if (this.props.currentlyPlayingNotes.includes(currentNote)) {
        className += ' KeyboardBlackKey--Pressed';
      }

      if (noteName) {
        return <a
          className={className}
          onMouseDown={() => this.props.onKeyOn(currentNote)}
          onTouchStart={e => {
            // Don't allow the mouse event to fire on a touch screen, as it will play the sound twice.
            this.props.onKeyOn(currentNote);
            e.preventDefault();
            e.stopPropagation();
          }}
          onMouseUp={() => this.props.onKeyOff(currentNote)}
          onTouchEnd={e => {
            this.props.onKeyOff(currentNote);
            e.preventDefault();
            e.stopPropagation();
          }}>
          {
            octaveIndex === this.props.lowestOctave ?
              <p className="KeyboardBlackKey__Text">{characterToNoteNameMap[noteName]}</p>
            :
              null
          }
        </a>
      } else {
        return <div className="KeyboardBlackKey__Hidden">
        </div>;
      }
    });
  }
}

export default Keyboard;
