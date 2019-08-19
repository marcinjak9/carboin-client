import produce from 'immer'
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from '../constants'

const initialState = {
  loading: true,
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
      case LOGOUT:
        draft.loading = false;
        draft.error = false;
        draft.user = null;
        break;
      default:
        break;
    }
  });
}
