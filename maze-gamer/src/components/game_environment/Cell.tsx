/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { CellState, Player, PlayerType } from '../../store/types';
import { isNil } from 'lodash';

export interface CellProps {
    cellState: CellState | null;
    row: number;
    column: number;
    totalRows: number;
    totalColumns: number;
    heroPlayerExist: boolean;
    addHeroPlayer: (cellId: string, player: Player) => void;
}
export class Cell extends React.Component<CellProps, any> {

    public cellOccupantPlayerType = (cellState: CellState | null) => {
        if (!isNil(cellState) && !isNil(cellState.occupant)) {
            if (cellState.occupant.type === PlayerType.ENEMY) {
                return { name: 'enemy', color: '#263238' };
            }
            if ((cellState.occupant.type === PlayerType.HERO)) {
                return { name: 'hero', color: '#F9A825' };
            }
        }
        return { name: 'empty', color: '#FFF' };
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
                        background: this.cellOccupantPlayerType(this.props.cellState).color,
                        borderRadius: '5px'
                    }}
                >
                    {(this.props.cellState) ? this.props.cellState.cell.column : null},
                    {(this.props.cellState) ? this.props.cellState.cell.row : null}
                </div>
            </td>
        );
    }
}
