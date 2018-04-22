/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { CellState, Player, PlayerType, Direction } from '../../store/types';
import { isNil } from 'lodash';

export interface CellProps {
    cellState: CellState | null;
    row: number;
    column: number;
    totalRows: number;
    totalColumns: number;
    addHeroPlayer: (cellId: string, player: Player) => void;
    getCellByRowCol: (row: number, col: number) => CellState | null;
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
        return { name: 'empty', color: '#999' };
    }

    public getAdjacentCells() {
        if (!isNil(this.props.cellState) && !isNil(this.props.cellState.occupant) && this.props.cellState.occupant.type === PlayerType.HERO) {
            for (let dir in Direction) {
                if (isNaN(Number(dir))) {
                    if (dir === 'TOP') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row - 1, this.props.column);
                        console.log((cellAbove) ? cellAbove.occupant : 'No such cell');
                    }
                    if (dir === 'BOTTOM') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row + 1, this.props.column);
                        console.log((cellAbove) ? cellAbove.occupant : 'No such cell');
                    }
                    if (dir === 'LEFT') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row, this.props.column - 1);
                        console.log((cellAbove) ? cellAbove.occupant : 'No such cell');
                    }
                    if (dir === 'RIGHT') {
                        const cellAbove = this.props.getCellByRowCol(this.props.row, this.props.column + 1);
                        console.log((cellAbove) ? cellAbove.occupant : 'No such cell');
                    }
                }
            }
        }
        
    }

    public placeHeroPlayer() {
        if (!isNil(this.props.cellState) && isNil(this.props.cellState.occupant)) {
            if (this.props.row === 1 && this.props.column === 1) {
                this.props.addHeroPlayer((this.props.cellState as any).cell.id, { type: PlayerType.HERO, adjacent: [] });
            }
        }
    }

    public componentDidMount() {
        this.placeHeroPlayer();
    }

    public componentDidUpdate() {
        this.getAdjacentCells();
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
                    {(this.props.cellState) ? this.props.cellState.cell.row : null},
                    {(this.props.cellState) ? this.props.cellState.cell.column : null}
                </div>
            </td>
        );
    }
}
