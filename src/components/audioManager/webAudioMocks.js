export class AudioContext {
  constructor() {
    this.destination = {};
  }
}

export class GainNode {
  constructor() {
    this.gain = {
      value: 1
    };

    this.connect = jest.fn();
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

    this.connect = jest.fn();
  }
}