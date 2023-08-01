import {CSSProperties} from 'react';
import {Employee} from 'types/employees';

export type Props = {
  className?: string;
  style?: CSSProperties;
  employee?: Employee | null;
  isOpen: boolean;
  onClose: () => void
};

export type State = {};
