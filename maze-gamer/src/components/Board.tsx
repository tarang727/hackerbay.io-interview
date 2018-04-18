/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button /* , Modal, ModalHeader, ModalBody, ModalFooter  */} from 'reactstrap';
import { Cell } from './Cell';

export interface BoardState {
    width: number;
    height: number;
    showModal: boolean;
}

export class Board extends React.Component {
    
    public render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <h1 className="text-center">Mario Maze Game</h1>
                    </div>
                    <div className="w-100" />
                    <div className="col-md-4 align-self-center">
                        <Button className="btn btn-info text-white" onClick={() => console.log('clicked!')}>Start Game</Button>
                    </div>

                    <div className="col-md-12">
                        <div className="row align-items-center justify-content-center">
                            <div className="col">
                                <Cell />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}