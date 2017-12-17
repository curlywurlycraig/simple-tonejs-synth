import {
  TOGGLE_MUTED,
  ADD_RACK,
  REMOVE_RACK,
  ADD_UNIT,
  ADD_NODE,
  INIT_AUDIO_MANAGER_PENDING,
  INIT_AUDIO_MANAGER_SUCCESS,
  CREATE_INSTRUMENT,
  NOTE_ON,
  NOTE_OFF,
  SET_WAVEFORM,
} from './constants';

export function toggleMuted() {
  return {
    type: TOGGLE_MUTED,
  };
}

export function addRack() {
  return {
    type: ADD_RACK,
  };
}

export function removeRack(index) {
  return {
    type: REMOVE_RACK,
    index,
  };
}

export function addUnit(rackIndex, unit) {
  return {
    type: ADD_UNIT,
    rackIndex,
    unit,
  };
}

export function addNode(rackIndex, unitIndex, node) {
  return {
    type: ADD_NODE,
    rackIndex,
    unitIndex,
    node,
  };
}

export function initAudioManagerPending() {
  return {
    type: INIT_AUDIO_MANAGER_PENDING,
  };
}

export function initAudioManagerSuccess(audioManager) {
  return {
    type: INIT_AUDIO_MANAGER_SUCCESS,
    audioManager,
  };
}

export function createInstrument() {
  return {
    type: CREATE_INSTRUMENT,
  };
}

export function noteOn(instrumentId, note) {
  return {
    type: NOTE_ON,
    instrumentId,
    note
  }
}

export function noteOff(instrumentId) {
  return {
    type: NOTE_OFF,
    instrumentId,
  }
}

export function setWaveform(instrumentId, waveform) {
  return {
    type: SET_WAVEFORM,
    instrumentId,
    waveform,
  }
}