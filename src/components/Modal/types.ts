import {CSSProperties} from 'react';
import {Employee} from 'types/employees';

export type Props = {
  className?: string;
  style?: CSSProperties;
  employee: Employee;
  isOpen: boolean;
  onSave: (employee: Employee) => void;
  onClose: () => void
};

export type State = {};
