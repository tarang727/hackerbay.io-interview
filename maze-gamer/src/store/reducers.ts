/**
 * created on 18.04.2018
 */

import { GameState, AddCell, AddPlayer, UpdateCellOccupant } from './types';
import * as actions from './actions'; 
import { checkIfCellExist, checkIfPlayerExist, getCell } from './util';
import { isNil, isError } from 'lodash';

export const defaultState: GameState = {
    moves: 0,
    board: []
};
export const gameReducer = (state: GameState = defaultState, action: actions.Actions) => {
    switch (action.type) {
        case 'ADD_CELL':
            const doesCellExist = checkIfCellExist(state.board, (action as AddCell).payload.cell);
            if (!isError(doesCellExist)) {
                return Object.assign({},
                    state,
                    { board: state.board.concat((action as AddCell).payload) }
                );
            }
            return state;
        case 'ADD_PLAYER_TO_CELL':
            const doesPlayerExist = checkIfPlayerExist(state.board, (action as AddPlayer).payload.player);
            const cellIndex = getCell(state.board, (action as AddPlayer).payload.cellId);
            if (isNil(cellIndex)) {
                return state;
            }
            if (!isError(doesPlayerExist) || !state.board[cellIndex].occupant) {
                return {
                    ...state,
                    board: state.board.map((cellState, idx) => {
                        if (idx === cellIndex) {
                            return {
                                ...cellState,
                                occupant: Object.assign({}, (action as AddPlayer).payload.player)
                            };
                        }
                        return cellState;
                    })
                };
            }
            return state;
        case 'UPDATE_OCCUPANT':
            const cellIdx = getCell(state.board, (action as AddPlayer).payload.cellId);

            if (isNil(cellIdx)) {
                return state;
            }

            return {
                ...state,
                board: state.board.map((cellState, idx) => {
                    if (idx === cellIdx) {
                        return {
                            ...cellState,
                            occupant: (action as UpdateCellOccupant).payload.occupant
                        };
                    }
                    return cellState;
                })
            };
        case 'EXIT_GAME':
            return { moves: 0, board: [] };
        default:
            return state;
    }
};
