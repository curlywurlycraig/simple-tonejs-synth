const simpleOscillator = {
  nodes: {
    oscillator: {
      type: 'oscillator',
      params: {
        type: 'sine',
        frequency: 440,
        detune: 0,
      },
      connectedTo: 'OUTPUT',
    }
  }
}

export default simpleOscillator;