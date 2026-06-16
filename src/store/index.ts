import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './offers';

export const store = configureStore({reducer});
