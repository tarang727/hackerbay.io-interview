/**
 * created on 18.04.2018
 */

import { combineReducers, createStore } from 'redux';
import { GameState, gameReducer } from './reducers';

export interface AppState {
  game: GameState;
}
export const store = createStore<AppState, any, any, any>(
  combineReducers({
    game: gameReducer
  })
);
