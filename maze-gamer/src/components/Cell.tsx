/**
 * created on 18.04.2018
 */

import * as React from 'react';

export interface CellProps {
    cellId: string;
    row: number;
    column: number;
    totalRows: number;
    totalColumns: number;
}
export class Cell extends React.Component<CellProps, any> {
    
    public render() {
        return (
            <td className="border" scope="col">
                (<small>{this.props.row}</small>, <small>{this.props.column}</small>)
            </td>
        );
    }
}
