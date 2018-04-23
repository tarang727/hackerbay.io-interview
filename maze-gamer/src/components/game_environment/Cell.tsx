/**
 * created on 18.04.2018
 */

// [TODO]: Component should update adjacent cells once the hero player is created //

import * as React from 'react';
import { CellState, Player, PlayerType, Direction } from '../../store/types';
import { isNil, delay } from 'lodash';
import { Hero } from '../game_players/Hero';
import { Enemy } from '../game_players/Enemy';

export interface CellProps {
    cellState: CellState | null;
    row: number;
    column: number;
    totalRows: number;
    totalColumns: number;
    addHeroPlayer: (cellId: string, player: Player) => void;
    getCellByRowCol: (row: number, col: number) => CellState | null;
    updateAdjacentCells: (cellId: string, player: Player | null) => void;
}
export class Cell extends React.Component<CellProps, any> {

    public cellOccupantPlayerType = () => {
        if (!isNil(this.props.cellState) && !isNil(this.props.cellState.occupant)) {
            if (this.props.cellState.occupant.type === PlayerType.ENEMY) {
                return { name: 'enemy', color: '#263238' };
            }
            if ((this.props.cellState.occupant.type === PlayerType.HERO)) {
                return { name: 'hero', color: '#F9A825' };
            }
        }
        return { name: 'empty', color: '#F5F5F5' };
    }

    public getAdjacentCells() {
        const adjacentCells: Array<{ cellId: string; direction: Direction; }> = [];
        if (!isNil(this.props.cellState) && !isNil(this.props.cellState.occupant) && this.props.cellState.occupant.type === PlayerType.HERO) {
            for (let dir in Direction) {
                if (isNaN(Number(dir))) {
                    if (dir === 'TOP') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row - 1, this.props.column);
                        if (cellAbove) {
                            adjacentCells.push({ cellId: (cellAbove as any).cell.id, direction: Direction.TOP });
                        }
                    }
                    if (dir === 'BOTTOM') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row + 1, this.props.column);
                        if (cellAbove) {
                            adjacentCells.push({ cellId: (cellAbove as any).cell.id, direction: Direction.BOTTOM });
                        }
                    }
                    if (dir === 'LEFT') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row, this.props.column - 1);
                        if (cellAbove) {
                            adjacentCells.push({ cellId: (cellAbove as any).cell.id, direction: Direction.LEFT });
                        }
                    }
                    if (dir === 'RIGHT') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row, this.props.column + 1);
                        if (cellAbove) {
                            adjacentCells.push({ cellId: (cellAbove as any).cell.id, direction: Direction.RIGHT });
                        }
                    }
                }
            }
            const { id: cellId } = (this.props.cellState as any).cell;
            const { type, id } = (this.props.cellState as any).occupant;
            this.props.updateAdjacentCells(cellId, { type, id, adjacent: adjacentCells });
        }
    }

    public placeHeroPlayer() {
        if (!isNil(this.props.cellState) && isNil(this.props.cellState.occupant)) {
            if (this.props.row === 1 && this.props.column === 1) {
                this.props.addHeroPlayer((this.props.cellState as any).cell.id, { type: PlayerType.HERO, adjacent: [] });
            }
        }
    }

    public move(cellId: string, playerId: string) {
        //
    }

    public placePlayers() {
        if (this.props.cellState && this.props.cellState.occupant) {
            if (this.props.cellState.occupant.type === PlayerType.ENEMY) {
                return (<Enemy />);
            }
            if (this.props.cellState.occupant.type === PlayerType.HERO) {
                return (<Hero player={this.props.cellState.occupant || null}  />);
            }
        }
        return null;
    }

    public componentDidMount() {
        this.placeHeroPlayer();
        /**
         * delay getting adjacent cells in-order to have the hero player created first
         */
        delay(() => {
            this.getAdjacentCells();
        }, 1000);
    }

    public render() {
        return (
            <td className="border-0 bg-white" scope="col" style={{ width: '40px', height: '40px' }}>
                <div
                    className="border text-white"
                    style={{
                        width: '40px',
                        height: '40px',
                        margin: '0 !important',
                        padding: '0 !important',
                        background: this.cellOccupantPlayerType().color,
                        borderRadius: '5px'
                    }}
                >
                    {this.placePlayers()}
                </div>
            </td>
        );
    }
}
