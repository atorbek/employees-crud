import {Employee} from './employees';
import {PayloadAction} from '@reduxjs/toolkit';
import {State} from 'types';

export type InitialAppReceivedAction = PayloadAction<State>;
export type InitialAppErrorAction = PayloadAction<{error: string} | undefined>;
export type AddEmployeeReceivedAction = PayloadAction<Employee>;
export type AddEmployeeErrorAction = PayloadAction<{ error: string } | undefined>;
