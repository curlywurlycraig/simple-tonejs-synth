import Audio from '../audio';

import { initAudioManagerPending, initAudioManagerSuccess } from './actions';

export function initialiseAudioManager() {
  return function _initialiseAudioManager(dispatch) {
    dispatch(initAudioManagerPending());
    const audioManager = new Audio();
    dispatch(initAudioManagerSuccess(audioManager));
  }
}