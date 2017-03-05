/**
 Taken from https://robots.thoughtbot.com/javascript-audio-api
 **/
class Audio {
  constructor() {
    this.context = this._createAudioContext();
  }

  _createAudioContext() {
    if (!window.audioContextInstance) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;

      if (window.AudioContext) {
        window.audioContextInstance = new AudioContext();
      } else {
        console.log('Web Audio API is not supported in this browser');
      }
    }

    return window.audioContextInstance;
  }
}

export default Audio;
