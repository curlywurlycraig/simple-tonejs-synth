import React from "react";
import Tone from "tone";
import Keyboard from '../keyboard';
import OctaveIndicator from '../octaveIndicator'
import { qwertyToKeyMap } from '../../utils/qwerty'
import './styles.css';

const MIN_OCTAVES = 3;
const MAX_OCTAVES = 6;

class AudioKeyboard extends React.Component {
  constructor(props) {
    super(props);
    Tone.context.lookAhead = 0;

    const synth = new Tone.PolySynth(4, Tone.Synth).toMaster();

    this.state = {
      synth,
      currentOctave: 4,
      currentlyPlayingNotes: [],
    };

    this.noteOn = this.noteOn.bind(this);
    this.noteOff = this.noteOff.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.keyPressed.bind(this));
    document.addEventListener("keyup", this.keyReleased.bind(this));
  }

  noteOn(note) {
    this.state.synth.triggerAttack(note)

    this.setState({
      currentlyPlayingNotes: [
        ...this.state.currentlyPlayingNotes,
        note,
      ]
    });
  }

  noteOff(note) {
    this.state.synth.triggerRelease()

    this.setState({
      currentlyPlayingNotes: this.state.currentlyPlayingNotes.filter(n => {
        return n !== note;
      }),
    });
  }

  keyPressed(e) {
    if (qwertyToKeyMap[e.key]) {
      const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;
      this.noteOn(note);
    } else if (e.key === "[" && this.state.currentOctave > MIN_OCTAVES) {
      this.setState({
        currentOctave: this.state.currentOctave - 1,
      });
    } else if (e.key === "]" && this.state.currentOctave < MAX_OCTAVES) {
      this.setState({
        currentOctave: this.state.currentOctave + 1,
      });
    }
  }

  keyReleased(e) {
    if (qwertyToKeyMap[e.key]) {
      const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;
      this.noteOff(note);
    }
  }

  render() {
    return (
      <div className="OutsideKeyboardContainer">
        <OctaveIndicator
          currentOctave={this.state.currentOctave}
          minOctave={MIN_OCTAVES}
          maxOctave={MAX_OCTAVES}
        />

        <Keyboard
          lowestOctave={this.state.currentOctave}
          octaveCount={3}
          onKeyOn={this.noteOn}
          onKeyOff={this.noteOff}
          currentlyPlayingNotes={this.state.currentlyPlayingNotes}
        />
      </div>
    );
  }
}

export default AudioKeyboard;