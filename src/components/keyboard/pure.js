import React from 'react';

import './styles.css';

const DEFAULT_LOWEST_OCTAVE = 0;

// note the empty string in the black notes. This is to just assist in drawing the gap where
// there is no such note.
const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotes = ['C#', 'D#', '', 'F#', 'G#', 'A#', ''];

class Keyboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentlyPlayingNotes: [],
    }

    this.keyPressed = this.keyPressed.bind(this);
    this.keyReleased = this.keyReleased.bind(this);
  }

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

  keyPressed(note) {
    const newNotes = [...this.state.currentlyPlayingNotes, note]
    this.setState({
      currentlyPlayingNotes: newNotes,
    });

    this.props.onKeyOn(note);
  }

  keyReleased(note) {
    const newNotes = this.state.currentlyPlayingNotes.filter(n => {
      return n !== note;
    });
    this.setState({
      currentlyPlayingNotes: newNotes,
    });

    this.props.onKeyOff(note);
  }

  displayWhiteKeys(octaveIndex) {
    return whiteNotes.map(noteName => {
      let className = "KeyboardWhiteKey";
      const currentNote = noteName + octaveIndex;

      if (this.state.currentlyPlayingNotes.includes(currentNote)) {
        className += ' KeyboardWhiteKey--Pressed';
      }

      return <a
        className={className}
        onMouseDown={() => this.keyPressed(currentNote)}
        onMouseUp={() => this.keyReleased(currentNote)}>
      </a>
    })
  }

  displayBlackKeys(octaveIndex) {
    return blackNotes.map(noteName => {
      let className = "KeyboardBlackKey";
      const currentNote = noteName + octaveIndex;

      if (this.state.currentlyPlayingNotes.includes(currentNote)) {
        className += ' KeyboardBlackKey--Pressed';
      }

      if (noteName) {
        return <a
          className={className}
          onMouseDown={() => this.keyPressed(currentNote)}
          onMouseUp={() => this.keyReleased(currentNote)}>
        </a>
      } else {
        return <div className="KeyboardBlackKey__Hidden">
        </div>;
      }
    });
  }
}

export default Keyboard;