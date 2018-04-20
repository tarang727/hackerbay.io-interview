/**
 * created on 18.04.2018
 */

import { GameState, AddCell, AddPlayer } from './types';
import * as actions from './actions'; 
import { checkIfCellExist, checkIfPlayerExist, getCell } from './util';

export const defaultState: GameState = {
    moves: 0,
    board: []
};
export const gameReducer = (state: GameState = defaultState, action: actions.Actions) => {
    switch (action.type) {
        case 'ADD_CELL':
            const doesCellExist = checkIfCellExist(state.board, (action as AddCell).payload.cell);
            if (!doesCellExist) {
                return Object.assign({},
                    state,
                    { board: state.board.concat((action as AddCell).payload) }
                );
            }
            return state;
        case 'ADD_PLAYER_TO_CELL':
            const doesPlayerExist = checkIfPlayerExist(state.board, (action as AddPlayer).payload.player);
            const cellIndex = getCell(state.board, (action as AddPlayer).payload.cellId);
            if (!doesPlayerExist || !state.board[cellIndex].occupant) {
                state.board[cellIndex].occupant = Object.assign({}, (action as AddPlayer).payload.player);
            }
            return state;
        case 'EXIT_GAME':
            return { moves: 0, board: [] };
        default:
            return state;
    }
};
