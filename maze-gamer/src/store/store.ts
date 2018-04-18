/**
 * created on 18.04.2018
 */

import { combineReducers, createStore } from 'redux';
import { DataState, sampleReducer } from './reducers/sampler';

export interface IAppState {
  data: DataState;
}

export const store = createStore<IAppState, any, any, any>(
  combineReducers({
    data: sampleReducer
  })
);
