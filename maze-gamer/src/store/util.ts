/**
 * created on 18.04.2018
 */

import { Cell, CellState, Player, PlayerType } from './types';
import { findIndex } from 'lodash';

export function checkIfCellExist(adjList: Array<CellState>, cell: Cell): boolean {
    try {
        const index = findIndex(adjList, o => o.cell.id === cell.id);
        if (index > -1) {
            const err = new Error();
            err.name = 'DuplicateCellCreationError';
            err.message = `a duplicate cell: ${cell.id} is trying to be created`;
            throw err;
        }
        return false;
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return true;
    }
}
export function checkIfPlayerExist(adjList: Array<CellState>, player: Player): boolean {
    try {
        const index = findIndex(adjList, o => (o.occupant as Player).id === player.id);
        if (index > -1) {
            const err = new Error();
            err.name = 'DuplicateCellPlayerError';
            err.message = `A duplicate player: ${player.id} on cell id: ${adjList[index].cell.id} is trying to be created`;
            throw err;
        }

        /* check if the player is HERO type */
        const heroIndex = findIndex(adjList, o => (o.occupant as Player).type === PlayerType.HERO);
        if (heroIndex !== -1) {
            const err = new Error();
            err.name = 'DuplicateHeroPlayerError';
            err.message = `There can only be one hero`;
            throw err;
        }

        return false;
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return true;
    }
}
export function getCell(adjList: Array<CellState>, cellId: string): number {
    const index = findIndex(adjList, o => o.cell.id === cellId);
    if (index < 0) {
        const err = new Error();
        err.name = 'CellNotFound';
        err.message = `seems the cell, cell id: ${cellId} does not exist`;
        throw err;
    }
    return index;
}