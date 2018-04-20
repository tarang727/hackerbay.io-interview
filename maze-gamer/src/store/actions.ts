/**
 * created on 18.04.2018
 */

import * as uuid from 'uuid';
import { MovePlayer, AddPlayer, AddCell, RemovePlayer, Cell, Player } from './types';

export type Actions = MovePlayer | AddPlayer | AddCell | RemovePlayer;

export const addCell = (cell: Cell) => {
    const id = uuid.v4();
    return {
        type: 'ADD_CELL',
        payload: {
            cell: Object.assign({}, cell, { id }),
            occupant: null
        }
    };
};
export const addPlayer = (cellId: string, player: Player) => {
    const id = uuid.v4();
    return {
        type: 'ADD_PLAYER_TO_CELL',
        payload: {
            cellId,
            player: Object.assign({}, player, { id })
        }
    };
};
export const movePlayer = (cellId: string, playerId: string) => ({ type: 'MOVE_PLAYER', payload: { cellId, playerId } });
export const removePlayer = (cellId: string) => ({ type: 'REMOVE_PLAYER_FROM_CELL', payload: { cellId } });
export const exitGame = () => ({ type: 'EXIT_GAME', payload: null });
