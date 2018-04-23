/**
 * created on 20.04.2018
 */

import * as React from 'react';
import { Player } from '../../store/types';

export interface HeroProps {
    player: Player | null;
}

export class Hero extends React.Component<HeroProps, any> {

    public render() {
        return (
            <p>
                <b>Hp</b>
            </p>
        );
    }

}