import { Data } from '../reducers/sampler';

// #note: Interfaces have any type on payload to suppress an error on the reducers 
export interface AddData {
    type: string;
    payload: {
        newData: Data
    } | any;
}
export interface EditData {
    type: string;
    payload: {
        updates: Data;
        idx: number;
    } | any;
}
export interface DeleteData {
    type: string;
    payload: {
        idx: number;
    } | any;
}

export type DataActions = EditData | DeleteData | AddData;

export const addData = (data: Data): AddData => ({ type: 'ADD_DATA', payload: data });
export const editData = (idx: number, updates: Data): EditData => ({ type: 'EDIT_DATA', payload: {idx, updates} });
export const deleteData = (idx: number): DeleteData => ({ type: 'DELETE_DATA', payload: {idx} });
export const selectData = (idx: number): DeleteData => ({ type: 'SELECT_DATA', payload: {idx} });