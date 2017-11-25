import { TOGGLE_MUTED } from './constants';

const defaultState = {
  muted: false,
};

export default function reducer(prevState = defaultState, action) {
  switch (action.type) {
    case TOGGLE_MUTED:
      return {
        ...prevState,
        muted: !prevState.muted,
      };
    default:
      return prevState;
  }
}