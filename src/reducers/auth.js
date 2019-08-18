import produce from 'immer'
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from '../constants'

const initialState = {
  loading: false,
  error: false,
  user: null,
}

export default function (state = initialState, action) {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.user = action.user;
        break;
      case LOGIN_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
      default:
        break;
    }
  });
}
