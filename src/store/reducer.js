import {INIT_AUDIO_MANAGER_PENDING, INIT_AUDIO_MANAGER_SUCCESS, TOGGLE_MUTED} from './constants';

const defaultState = {
  audio: {
    muted: false,
    manager: null,
    state: null,
  },
};

export default function reducer(prevState = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MUTED:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          muted: !prevState.audio.muted,
        }
      };
    case INIT_AUDIO_MANAGER_PENDING:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          state: 'pending',
        }
      };
    case INIT_AUDIO_MANAGER_SUCCESS:
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          state: 'success',
          manager: action.audioManager,
        },
      };
    default:
      return prevState;
  }
}