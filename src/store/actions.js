import {
  TOGGLE_MUTED,
  INIT_AUDIO_MANAGER_PENDING,
  INIT_AUDIO_MANAGER_SUCCESS,
  CREATE_INSTRUMENT,
  NOTE_ON,
  NOTE_OFF,
} from './constants';

export function toggleMuted() {
  return {
    type: TOGGLE_MUTED
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