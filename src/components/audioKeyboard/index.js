import React from "react";
import AudioManager from '../audioManager';
import Keyboard from '../keyboard/pure';
import { createPartialOscillator, createGainNode } from '../../utils/nodes';
import { qwertyToKeyMap, getFrequencyFromNoteName } from '../../utils/frequency'
import './styles.css';

/**
 * Self-contained keyboard with audio manager.
 */
class AudioKeyboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOctave: 4,
      audioGraph: {
        nodes: {},
        outputNode: createGainNode(1),
      },
      synthGraph: {
        // TODO: Generate these based on the graph editor
        oscillators: [
          createPartialOscillator('sine', 7),
          createPartialOscillator('triangle', -6),
          createPartialOscillator('sine', 8),
          createPartialOscillator('triangle', -10),
          createPartialOscillator('sine', 0),
        ],
      },
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
    const newNodes = {
      ...this.state.audioGraph.nodes,
    };

    this.state.synthGraph.oscillators.forEach(oscillator => {
      const id = `${oscillator.id}_${note}`;
      newNodes[id] = {
        ...oscillator,
        id,
        params: {
          ...oscillator.params,
          frequency: getFrequencyFromNoteName(note),
        }
      }
    });

    this.setState({
      audioGraph: {
        ...this.state.audioGraph,
        nodes: newNodes,
      },
      currentlyPlayingNotes: [
        ...this.state.currentlyPlayingNotes,
        note,
      ]
    });
  }

  noteOff(note) {
    const removedIds = this.state.synthGraph.oscillators.map(oscillator => {
      return `${oscillator.id}_${note}`;
    });

    const newNodes = {};
    Object.keys(this.state.audioGraph.nodes).forEach(nodeKey => {
      const node = this.state.audioGraph.nodes[nodeKey];

      if (!removedIds.includes(node.id)) {
        newNodes[nodeKey] = node;
      }
    });

    this.setState({
      audioGraph: {
        ...this.state.audioGraph,
        nodes: newNodes,
      },
      currentlyPlayingNotes: this.state.currentlyPlayingNotes.filter(n => {
        return n !== note;
      }),
    });
  }

  keyPressed(e) {
    if (!qwertyToKeyMap[e.key]) return;
    const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;

    this.noteOn(note);
  }

  keyReleased(e) {
    if (!qwertyToKeyMap[e.key]) return;
    const note = `${qwertyToKeyMap[e.key]}${this.state.currentOctave}`;

    this.noteOff(note);
  }

  render() {
    return (
      <div className="OutsideKeyboardContainer">
        <AudioManager audioGraph={this.state.audioGraph}></AudioManager>

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