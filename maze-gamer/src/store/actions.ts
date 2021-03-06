/**
 * created on 18.04.2018
 */

import * as uuid from 'uuid';
import { MovePlayer, AddPlayer, AddCell, RemovePlayer, Cell, Player, UpdateCellOccupant } from './types';

export type Actions = MovePlayer | AddPlayer | AddCell | RemovePlayer | UpdateCellOccupant;

export const addCell = (cell: Cell, player?: Player) => {
    let occupant;
    if (!!player) {
        occupant = Object.assign({}, player, { id: uuid.v4() });
    }
    return {
        type: 'ADD_CELL',
        payload: {
            cell: Object.assign({}, cell, { id: uuid.v4() }),
            occupant: !!player ? occupant : null
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
export const updateCellOccupant = (cellId: string, player: Player | null) => ({ type: 'UPDATE_OCCUPANT', payload: { cellId, occupant: player } });
export const movePlayer = (cellId: string, playerId: string) => ({ type: 'MOVE_PLAYER', payload: { cellId, playerId } });
export const removePlayer = (cellId: string) => ({ type: 'REMOVE_PLAYER_FROM_CELL', payload: { cellId } });
export const exitGame = () => ({ type: 'EXIT_GAME', payload: null });
