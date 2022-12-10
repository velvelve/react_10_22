import { CHANGE_NAME, TOGGLE_PROFILE } from './actions';

export interface ToggleProfile {
  type: typeof TOGGLE_PROFILE;
}

export interface ChangeName {
  type: typeof CHANGE_NAME;
  name: string;
}

export type ProfileAction = ToggleProfile | ChangeName;
