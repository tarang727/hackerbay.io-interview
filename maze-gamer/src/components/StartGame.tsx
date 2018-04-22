/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { isNaN, isNil } from 'lodash';

export interface StartGameState {
    width: number | null;
    height: number | null;
    error: { type: string; message: string; } | null;
}
export interface StartGameProps {
    startGame: (e: any) => any;
}
export class StartGame extends React.Component<StartGameProps, StartGameState> {

    constructor(props: StartGameProps)  {
        super(props);
        this.state = {
            width: null,
            height: null,
            error: null
        };
    }
    public makeValNum(val: any, type: string) {
        const num = parseInt(val, 10);
        if (isNaN(num)) {
            this.setState(state => ({ ...state, error: { type, message: 'Input is not a number' } }));
            return null;
        }
        if (num > 10) {
            this.setState(state => ({ ...state, error: { type, message: 'Input is more than 10' } }));
            return null;
        }
        if (num < 5) {
            this.setState(state => ({ ...state, error: { type, message: 'Input is less than 5' } }));
            return null;
        }
        return num;
    }

    public updateFormState(type: string, value: any) {
        this.resetErrors();
        const num = this.makeValNum(value, type);
        if (type === 'width' || type === 'height' && !isNil(num)) {
            this.setState(state => ({ ...state, [type]: num }));
        } else {
            this.setState(state => ({ ...state, error: { type, message: 'Input is invalid' } }));
        }
    }

    public resetErrors() {
        this.setState(state => ({ ...state, error: null }));        
    }

    public submitForm(e: React.FormEvent<any>) {
        e.preventDefault();
        const { width, height } = this.state;
        if (!isNil(width) && !isNil(height)) {
            this.props.startGame({ width, height });
        }
    }

    public render() {
        return (
            <Form onSubmit={e => this.submitForm(e)} autoFocus>
                <FormGroup>
                    <Label for="width">Enter the width of the board:</Label>
                    <Input
                        type="text"
                        name="board-width"
                        autoFocus
                        id="width"
                        placeholder="Width of the Board"
                        onChange={e => this.updateFormState('width', e.target.value)}
                    />

                    <p className="help-text text-muted">
                        <span style={{ display: 'block', margin: 0, padding: 0 }}>Please enter a value between 5 to 10</span>
                        {!isNil(this.state.error) && this.state.error.type === 'width'
                            ?
                            (
                                <span className="text-danger"style={{ display: 'block', margin: 0, padding: 0 }}>
                                    {this.state.error.message}
                                </span>
                            )
                            :
                            null
                        }
                    </p>
                </FormGroup>
                <FormGroup>
                    <Label for="height">Enter the height of the board:</Label>

                    <Input
                        type="text"
                        name="board-height"
                        id="height"
                        placeholder="Height of the board"
                        onChange={e => this.updateFormState('height', e.target.value)}
                    />

                    <p className="help-text text-muted">
                        <span style={{ display: 'block', margin: 0, padding: 0 }}>Please enter a value between 5 to 10</span>
                        {!isNil(this.state.error) && this.state.error.type === 'height'
                            ?
                            (
                                <span className="text-danger"style={{ display: 'block', margin: 0, padding: 0 }}>
                                    {this.state.error.message}
                                </span>
                            )
                            :
                            null
                        }
                    </p>
                    
                </FormGroup>
                <Button
                    type="submit"
                    disabled={!isNil(this.state.error) || (isNil(this.state.width) || isNil(this.state.height))}
                    color="info"
                >
                    Start The Game
                </Button>
            </Form>
        );
    }
}
