import {State} from 'types';

const initialAppState: State = {
  employees: {
    entities: {},
    ids: [],
    status: 'idle',
    error: null
  }
};

export {
  initialAppState
};
