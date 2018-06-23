export function createSineOscillator(frequency) {
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

export function createPartialOscillator(waveform, detune) {
  return {
    id: `${waveform}_${detune}`,
    type: 'oscillator',
    waveform,
    params: {
      detune,
    },
    connectedTo: ['OUTPUT'],
  }
}