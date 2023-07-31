import {State} from 'types';
import {initialAppState} from 'init/app';

const defaultGetState = (): State => (initialAppState);

export {
  defaultGetState
};
