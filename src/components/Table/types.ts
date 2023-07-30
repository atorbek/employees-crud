import {CSSProperties} from 'react';
import {Employee} from 'types/employees';
import {WrappedStateObjects} from 'types';

export type Props = {
  className?: string;
  style?: CSSProperties;
  employees: WrappedStateObjects<Employee>;
};

export type State = {};
