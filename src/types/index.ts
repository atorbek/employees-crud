import {Employee} from './employees';

type Action = {
  data?: any,
  type: string
};

export type WrappedStateObjects<T> = {
  entities: {
    [id: string]: T;
  };
  ids: string[];
};

export type State = {
  employees: WrappedStateObjects<Employee> & {status: string; error: null | string};
};

/* eslint-disable no-use-before-define */
export type GetState = () => State;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => void;
