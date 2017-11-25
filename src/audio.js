/**
 Taken from https://robots.thoughtbot.com/javascript-audio-api
 **/
class Audio {
  constructor() {
    this.context = this._createAudioContext();
    this.masterGainNode = this.context.createGain();
    this.masterGainNode.connect(this.context.destination);
  }

  _createAudioContext() {
    if (!window.audioContextInstance) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;

      if (window.AudioContext) {
        window.audioContextInstance = new AudioContext();
      } else {
        throw new Error('Web Audio API is not supported in this browser');
      }
    }

    return window.audioContextInstance;
  }
}

export default Audio;
