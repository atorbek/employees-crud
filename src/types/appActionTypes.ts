import {PayloadAction} from '@reduxjs/toolkit';
import {State} from 'types';

export type InitialAppReceivedAction = PayloadAction<State>;
export type InitialAppErrorAction = PayloadAction<{error: string} | undefined>;
