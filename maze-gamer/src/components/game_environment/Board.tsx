/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { isNil, fill, random } from 'lodash';
import { StartGame } from '../StartGame';
import { Cell } from './Cell';
import { Player, CellState, PlayerType } from '../../store/types';

export interface BoardState {
    width: number | null;
    height: number | null;
    showModal: boolean;
}

export interface BoardProps {
    onAddCell: (row: number, column: number, player?: Player | undefined) => void;
    totalCells: number;
    onGameExit: () => void;
    noOfRows: number;
    noOfColumns: number;
    cellByRowAndColumn: (row: number, col: number) => CellState | null;
    className: any;
    heroPlayerExist: boolean;
    onAddPlayer: (cellId: string, player: Player) => void;
    [key: string]: any;
}

export class Board extends React.Component<BoardProps, BoardState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            width: null,
            height: null,
            showModal: false
        };
    }

    public toggle(e?: any) {
        if (!isNil(e)) {
            e.preventDefault();
        }
        this.setState((state) => ({ ...state, showModal: !state.showModal }));
    }

    public createBoard(width: number, height: number) {
        if (this.props.totalCells === 0) {
            this.setState(state => ({ ...state, width, height }));

            const rows = fill(Array(width), 'r');
            const cols = fill(Array(height), 'c');

            const setOfPlayers = this.addEnemies(15, ((rows.length + 1) * (cols.length + 1)));
            
            rows.forEach((r, rIdx) => {
                cols.forEach((c, cIdx) => {
                    const row = rIdx + 1;
                    const col = cIdx + 1;
                    if (setOfPlayers.has(row * col)) {
                        this.props.onAddCell(row, col, { type: PlayerType.ENEMY });
                    } else {
                        this.props.onAddCell(row, col);
                    }
                });
            });
        }
    }

    public addEnemies(numOfPlayers: number, totalCells: number) {
        const set = new Set();

        while (set.size < numOfPlayers) {
            const randomIdx = random(5, totalCells - 1);
            set.add(randomIdx);
        }
        return set;
    }

    public exitGame() {
        this.setState(state => ({ ...state, width: null, height: null }));
        this.props.onGameExit();
    }

    public drawBoard() {
        const { noOfRows, noOfColumns } = this.props;
        if (noOfRows < 5 && noOfColumns < 5) {
            return null;
        }
        const rows = fill(Array(noOfRows), 'r');
        const cols = fill(Array(noOfColumns), 'c');

        return rows.map((r, rIdx) => (
            <tr key={rIdx} style={{ width: 'auto', height: 'auto', margin: 0, padding: 0 }}>
                {cols.map((c, cIdx) => {
                    return (
                        <Cell
                            key={cIdx}
                            cellState={this.props.cellByRowAndColumn(rIdx + 1, cIdx + 1)}
                            row={rIdx + 1}
                            column={cIdx + 1}
                            totalColumns={this.props.noOfColumns}
                            totalRows={this.props.noOfRows}
                            addHeroPlayer={this.props.onAddPlayer}
                            getCellByRowCol={this.props.cellByRowAndColumn}
                        />
                    );
                })}
            </tr>
        ));
    }

    public render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-8 my-1 align-self-center justify-content-center">
                        <div className="card bg- w-100 text-muted">
                            <div className="card-header bg-transparent">
                            <h3 className="text-muted d-inline">
                                <b>
                                    <span className="text-primary">Mario</span>{' '}<span className="text-info">Maze</span> Game
                                </b>
                            </h3>                                
                                {
                                    (this.props.totalCells > 0)
                                    ?
                                    null 
                                    : 
                                    (
                                        <Button
                                            className="btn btn-dark btn-sm text-white mx-3 float-right"
                                            onClick={e => this.toggle(e)}
                                        >
                                            Start Game
                                        </Button>
                                    )
                                }
                                
                            </div>
                            <div className="card-body text-white align-self-center">
                                {
                                    (this.props.totalCells > 0) ?
                                        <table className="table table-sm border-0 text-dark" style={{ width: 0, padding: 0 }}>
                                            <tbody style={{ width: 0, padding: 0 }}>{this.drawBoard()}</tbody>
                                        </table>
                                    :
                                        <h3 className="text-muted d-block"> Start Game </h3>
                                }
                            </div>
                                {
                                    (this.props.totalCells < 1)
                                    ?
                                    null 
                                    : 
                                    (
                                        <div className="card-footer">
                                            <Button
                                                className="btn btn-danger btn-sm text-white mx-3 float-right"
                                                onClick={e => this.exitGame()}
                                            >
                                                End Game
                                            </Button>
                                        </div>
                                    )
                                }
                        </div>
                    </div>

                </div>

                <Modal
                    isOpen={this.state.showModal}
                    toggle={() => this.toggle()}
                    className={this.props.className}
                    size="sm"
                    role="dialog"
                    autoFocus
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Start Game</ModalHeader>
                    <ModalBody>
                        <StartGame
                            startGame={({width, height}) => {
                                this.toggle();
                                this.createBoard(width, height);
                            }}
                        />
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}