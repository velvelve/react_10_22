import { CHANGE_NAME, TOGGLE_PROFILE } from './actions';
import { ProfileAction } from './types';
import { Reducer } from 'redux';

export interface ProfileState {
  name: string;
  visible: boolean;
}

const initialState: ProfileState = {
  name: 'gb',
  visible: true,
};

export const profileReducer: Reducer<ProfileState, ProfileAction> = (
  state = initialState,
  action: ProfileAction
) => {
  switch (action.type) {
    case TOGGLE_PROFILE: {
      return {
        ...state,
        visible: !state.visible,
      };
    }
    case CHANGE_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    default:
      return state;
  }
};
