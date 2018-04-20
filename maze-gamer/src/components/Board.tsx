/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { isNil } from 'lodash';
import { Cell } from './Cell';
import { StartGame } from './StartGame';

export interface BoardState {
    width: number;
    height: number;
    showModal: boolean;
}

export class Board extends React.Component<any, BoardState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            showModal: false
        };
    }

    public toggle(e?: any) {
        if (!isNil(e)) {
            e.preventDefault();
        }
        this.setState((state) => ({ ...state, showModal: !state.showModal }));
    }

    public changeBoardMeasurements(width: number, height: number) {
        this.setState((state) => ({...state, width, height}));        
    }

    public drawBoard(width: number, height: number) {
        console.log(width, height);
        this.toggle();
    }

    public render() {
        return (
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <h1 className="text-center">Mario Maze Game</h1>
                    </div>
                    <div className="w-100" />
                    <div className="col-md-1 mt-2 align-self-center">
                        <Button className="btn btn-info text-white" onClick={e => this.toggle(e)}>Start Game</Button>
                        <Modal isOpen={this.state.showModal} toggle={() => this.toggle()} className={this.props.className} size="sm" role="dialog" autoFocus centered>
                            <ModalHeader toggle={() => this.toggle()}>Start Game</ModalHeader>
                            <ModalBody>
                                <StartGame
                                    startGame={({width, height}) => this.drawBoard(width, height)}
                                />
                            </ModalBody>
                        </Modal>
                    </div>

                    <div className="col-md-12 mt-5 mb-5">
                        <div className="row align-items-center justify-content-center"> {/* ROW */}
                            <div className="col-1 border border-danger"> {/* COLUMN */}
                                <Cell /> {/* CELL */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}