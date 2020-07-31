import initialSorter from '../constants/initialSorter';
import filterTypes from '../constants/filterTypes';

const initialState = {
    list: [],
    favorites: [],
    filterState: { ...filterTypes },
    sorterState: { ...initialSorter },
    loading: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    console.log(action.type);

    switch(action.type) {
        case 'FETCH_BOOK_LIST_REQUEST':
            return {
                ...state,
                list: [],
                loading: true,
                error: null,
            };
        case 'FETCH_BOOK_LIST_SUCCESS':
            return {
                ...state,
                list: action.payload.list,
                filterState: action.payload.filterState,
                sorterState: action.payload.sorterState,
                loading: false,
                error: null,
            };
        case 'FETCH_BOOK_LIST_FAILURE':
            return {
                ...state,
                list: [],
                loading: false,
                error: action.payload,
            };
            case 'FETCH_FAVORITES_LIST_REQUEST':
            return {
                ...state,
                favorites: [],
                loading: true,
                error: null,
            };
        case 'FETCH_FAVORITES_LIST_SUCCESS':
            return {
                ...state,
                favorites: action.payload.favorites,
                sorterState: action.payload.sorterState,
                loading: false,
                error: null,
            };
        case 'FETCH_FAVORITES_LIST_FAILURE':
            return {
                ...state,
                favorites: [],
                loading: false,
                error: action.payload,
            };
        default: return state;
    }
};

export default reducer;