import { DataActions } from '../actions/sampler';

export interface Data {
    content: string;
    timestamp: Date;
    user: {
        name: string,
        email: string;
    };
}
export interface DataState { 
    idx: number | null;
    data: Data[];
}
const defaultData = { idx: null, data: [] };
export const sampleReducer = (state: DataState = defaultData, {type, payload}: DataActions): DataState => {
    switch (type) {
        case 'ADD_DATA':
            return Object.assign({}, state, {
                data: state.data.concat(payload) 
            });
        case 'EDIT_DATA':
            return Object.assign({}, state, {
                data: state.data.map((v, idx) => (idx === payload.idx) ? payload.updates : v)
            });
        case 'DELETE_DATA':
            return Object.assign({}, state, {
                data: state.data.filter((v, idx) => (idx !== payload.idx))
            });
        case 'SELETE_DATA':
            return {idx: payload.idx, data: [...state.data] };
        default:
            return state;
    }
};