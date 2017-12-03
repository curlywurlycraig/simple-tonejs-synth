import {
  CREATE_INSTRUMENT,
  INIT_AUDIO_MANAGER_PENDING,
  INIT_AUDIO_MANAGER_SUCCESS,
  TOGGLE_MUTED,
  NOTE_ON,
  NOTE_OFF,
} from './constants';

const defaultState = {
  audio: {
    muted: false,
    manager: null,
    state: null,
    instruments: {},
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
    case CREATE_INSTRUMENT:
      let highestId;
      if (Object.keys(prevState.audio.instruments).length) {
        highestId = Math.max(Object.keys(prevState.audio.instruments));
      } else {
        highestId = -1;
      }

      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: {
            ...prevState.audio.instruments,
            [highestId + 1]: {
              id: highestId + 1,
              note: null,
            }
          }
        }
      };
    case NOTE_ON: {
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: {
            ...prevState.audio.instruments,
            [action.instrumentId]: {
              ...prevState.audio.instruments[action.instrumentId],
              note: action.note,
            }
          }
        }
      };
    }
    case NOTE_OFF: {
      return {
        ...prevState,
        audio: {
          ...prevState.audio,
          instruments: {
            ...prevState.audio.instruments,
            [action.instrumentId]: {
              ...prevState.audio.instruments[action.instrumentId],
              note: null,
            }
          }
        }
      };
    }
    default:
      return prevState;
  }
}