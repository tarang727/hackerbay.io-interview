/**
 * created on 18.04.2018
 */

import { createStore } from 'redux';
import { gameReducer } from './reducers';
import { GameState } from './types';

export const store = createStore<GameState, any, any, any>(
  gameReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);