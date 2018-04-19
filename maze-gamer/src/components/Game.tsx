/**
 * created on 18.04.
 * @author John Waweru
 * @version 1.0.0
 * @desc A high-order component for binding the game board with the game state
 */

import { connect } from 'react-redux';
import { Board } from './Board';
import { Cell, GameState, PlayerType, CellState } from '../store/types';
import { isNil } from 'lodash';

const findPlayers = (cellState: CellState, type: PlayerType) => {
    return !isNil(cellState.occupant) && cellState.occupant.type === type;
};

const mapStateToProps = (state: GameState) => ({
    boardTableCells: state.board,
    noOfCells: state.board.length,
    emptyCells: state.board.filter((cellState) => isNil(cellState.occupant)),
    findHeroPlayer: (board => {
        const hero = board.filter(v => findPlayers(v, PlayerType.HERO));
        if (hero.length === 1) { return hero[0]; }
        return null;
    })(state.board),
    findEnemyPlayers: state.board.filter(v => findPlayers(v, PlayerType.ENEMY)),
    movesMadeByPlayer: state.moves,
});

const mapDispatchToProps = (dispatch) => ({
    onAddCell: (cell: Cell) => {
        dispatch(cell);
    }
});

const Game = connect(mapStateToProps, mapDispatchToProps)(Board);

export default Game;