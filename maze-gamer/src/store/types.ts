/**
 * created on 18.04.2018
 */

export enum PlayerType {
    HERO,
    ENEMY
}
export enum Direction {
    TOP,
    BOTTOM,
    LEFT,
    RIGHT
}
export interface Player {
    id?: string;
    type: PlayerType;
    adjacent?: Array<{ cellId: string; direction: Direction; }>;
}
export interface Cell {
    id?: string;
    row: number;
    column: number;
}
export interface CellState {
    cell: Cell;
    occupant: Player | null;
}
export interface AddCell {
    type: string;
    payload: CellState;
}
export interface AddPlayer {
    type: string;
    payload: {
        player: Player;
        cellId: string;
    };
}
export interface MovePlayer {
    type: string;
    payload: {
        cellId: string;
        playerId: string;
    };
}
export interface RemovePlayer {
    type: string;
    payload: {
        cellId: string;
    };
}
export interface UpdateCellOccupant {
    type: string;
    payload: {
        occupant: Player | null;
    };
}
export interface GameState {
    moves: number;
    board: Array<CellState>;
}
/* 
export interface CheckCell {
    type: string;
    action: {
        cellId: string;
    };
}
export interface PlayerStatus {
    type: string;
    action: {
        cellId: string;
        playerId: string;
    };
}
 */
