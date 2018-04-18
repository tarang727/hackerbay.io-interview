/**
 * created on 18.04.2018
 */

import * as React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class StartGame extends React.Component {
    
    public render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="width">Enter the width of the board:</Label>
                    <Input type="text" name="board-width" id="width" placeholder="Width of the Board" />
                    <p className="help-text text-muted">
                        Please enter a value between 5 to 10
                    </p>
                </FormGroup>
                <FormGroup>
                    <Label for="height">Enter the height of the board:</Label>
                    <Input type="text" name="board-height" id="height" placeholder="Height of the board" />
                    <p className="help-text text-muted">
                        Please enter a value between 5 to 10
                    </p>
                </FormGroup>
                <Button color="info">Start The Game</Button>
            </Form>
        );
    }
}
