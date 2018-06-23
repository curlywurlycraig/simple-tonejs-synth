export const createSineOscillator = frequency => {
  return {
    type: 'oscillator',
    waveform: 'sine',
    params: {
      frequency,
      detune: 0,
    },
    connectedTo: ['OUTPUT'],
  };
};

export const createGainNode = gain => {
  return {
    type: 'gain',
    params: {
      gain
    },
  }
};