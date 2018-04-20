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
            <td className="border-0" scope="col" style={{ width: '40px', height: '40px' }}>
                <div className="border" style={{ width: '40px', height: '40px', margin: '0 !important', padding: '0 !important' }}>
                    {this.props.children}
                </div>
            </td>
        );
    }
}
