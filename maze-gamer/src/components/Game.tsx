/**
 * created on 18.04.
 * @author John Waweru
 * @version 1.0.0
 * @desc A high-order component for binding the game board with the game state
 */

import { connect } from 'react-redux';
import { Board } from './Board';
import { GameState, PlayerType, CellState } from '../store/types';
import { isNil, findIndex, max } from 'lodash';
import { getCell } from '../store/util';
import { addCell, exitGame } from '../store/actions';

const findPlayers = (cellState: CellState, type: PlayerType) => !isNil(cellState.occupant) && cellState.occupant.type === type;
const findCellState = (board: Array<CellState>) => (cellId: string) => board[getCell(board, cellId)];
const findHeroPlayer = (board: Array<CellState>) => {
    const hero = board.filter(v => findPlayers(v, PlayerType.HERO));
    if (hero.length === 1) { return hero[0]; }
    return null;
};
const findAdjacentCells = (board: Array<CellState>) => (cellId: string) => {
    const cellState = board[getCell(board, cellId)];
    if (isNil(cellState.occupant) || (cellState.occupant.type !== PlayerType.HERO)) {
        return null;
    }
    if (isNil(cellState.occupant.adjacent) || cellState.occupant.adjacent.length < 2) {
        return null;
    }
    const moves: any = {};
    cellState.occupant.adjacent.forEach(pos => {
        moves[pos.direction] = pos.cellId;
    });
    return moves;
};
const findCellByRowAndColumn = (board: Array<CellState>) => {
    return (row: number, col: number) => {
        const index = findIndex(board, (o: CellState) => (o.cell.row === row && o.cell.column === col));
        if (index < 0) { return null; }
        return board[index];
    };
};

const mapStateToProps = (state: GameState) => ({
    boardTableCells: state.board,
    movesMade: state.moves,
    totalCells: state.board.length,
    emptyCells: state.board.filter((cellState) => isNil(cellState.occupant)),
    heroPlayer: findHeroPlayer(state.board),
    enemyPlayers: state.board.filter(v => findPlayers(v, PlayerType.ENEMY)),
    singleCell: findCellState(state.board),
    heroAdjacentCells: findAdjacentCells(state.board),
    cellByRowAndColumn: findCellByRowAndColumn(state.board),
    noOfRows: max(state.board.map(cellState => cellState.cell.row)) || 0,
    noOfColumns: max(state.board.map(cellState => cellState.cell.column)) || 0
});

const mapDispatchToProps = (dispatch) => ({
    onGameExit: () => {
        dispatch(exitGame());
    },
    onAddCell: (row: number, column: number) => {
        dispatch(addCell({ row, column }));
    }
});

const Game = connect(mapStateToProps, mapDispatchToProps)(Board);

export default Game;