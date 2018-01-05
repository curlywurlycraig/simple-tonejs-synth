export class GainNode {
  constructor() {
    this.gain = {
      value: 1
    };
  }
}

export class OscillatorNode {
  constructor() {
    this.frequency = {
      value: 440
    };

    this.type = {
      value: 'sine'
    };

    this.detune = {
      value: 0
    };
  }
}