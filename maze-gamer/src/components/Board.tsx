/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { isNil, fill } from 'lodash';
import { StartGame } from './StartGame';
import { Cell } from './Cell';

export interface BoardState {
    width: number | null;
    height: number | null;
    showModal: boolean;
}

export class Board extends React.Component<any, BoardState> {
    
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
            const rows = fill(Array(width), 'r');
            const cols = fill(Array(height), 'c');
            
            rows.forEach((r, rIdx) => {
                cols.forEach((c, cIdx) => {
                    this.props.onAddCell(rIdx + 1, cIdx + 1);
                });
            });
        }
    }

    public drawBoard() {
        const { noOfRows, noOfColumns } = this.props;
        if (noOfRows < 5 && noOfColumns < 5) {
            return null;
        }
        const rows = fill(Array(noOfRows), 'r');
        const cols = fill(Array(noOfColumns), 'c');

        return rows.map((r, rIdx) => (
            <tr key={rIdx}>  {/* ROW */}
                {
                    cols.map((c, cIdx) => (
                        <Cell
                            key={cIdx}
                            cellId={this.props.cellByRowAndColumn(rIdx + 1, cIdx + 1)}
                            row={rIdx + 1}
                            column={cIdx + 1}
                            totalColumns={this.props.noOfColumns}
                            totalRows={this.props.noOfRows}
                        />
                    ))
                }
            </tr>
        ));
    }

    public render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-4 mt-3 mb-4 align-self-center">
                        <span className="display-4 text-muted">
                            <b><span className="text-primary">Mario</span> <span className="text-dark">Maze</span></b>
                        </span>
                    </div>
                    <div className="w-100 border border-primary" />
                    <div className="col-md-12 py-2 my-2 align-items-center">
                        <div className="card w-100 text-muted">
                            <div className="card-header">
                                <Button
                                    className="btn btn-danger btn-sm text-white mx-3 float-right"
                                    onClick={e => this.props.onGameExit()}
                                >
                                    Quit Game
                                </Button>
                                <Button
                                    className="btn btn-dark btn-sm text-white mx-3 float-right"
                                    onClick={e => this.toggle(e)}
                                >
                                    Start Game
                                </Button>
                            </div>
                            <div className="card-body">
                                <table className="table table-sm table-bordered">
                                    <tbody>
                                        {this.drawBoard()}
                                    </tbody>
                                </table>
                            </div>
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