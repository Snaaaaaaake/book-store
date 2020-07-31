import initialSorter from '../constants/initialSorter';
import sortFunction from '../utils/sortFunction';
import createFilterFunction from '../utils/createFilterFunction';
import CookieMethods from '../utils/CookieMethods';

const cookieMethods = new CookieMethods("favoriteBooks");

const fetchBookListRequest = () => {
    return {
        type: "FETCH_BOOK_LIST_REQUEST",
    }
};
const fetchBookListSuccess = (data) => {
    return {
        type: "FETCH_BOOK_LIST_SUCCESS",
        payload: data,
    }
};
const fetchBookListFailure = (error) => {
    return {
        type: "FETCH_BOOK_LIST_FAILURE",
        payload: error,
    }
};

const fetchBooks = (dispatch, ownProps) => () => {
    const { bookService } = ownProps;
    dispatch(fetchBookListRequest());
    bookService.getAllBooks()
            .then(data => dispatch(fetchBookListSuccess({
                list: sortFunction(data.list, initialSorter),
                filterState: createFilterFunction(data.list),
                sorterState: initialSorter,
            })))
            .catch(err => dispatch(fetchBookListFailure(err)))
}

const fetchFilteredBooks = (dispatch, ownProps) => (newFilterState) => {
    const { bookService } = ownProps;
    dispatch(fetchBookListRequest());
    bookService.getFilteredBooks(newFilterState)
            .then(data => dispatch(fetchBookListSuccess({
                list: sortFunction(data.list, initialSorter),
                filterState: newFilterState,
                sorterState: initialSorter,
            })))
            .catch(err => dispatch(fetchBookListFailure(err)))
}

const addSortedBooks = (dispatch, ownProps) => (currentSorter) => {
    const { list, filterState, sorterState } = ownProps.state;
    let newSorterState = {
        active: currentSorter.type,
        sortersObject: { ...initialSorter.sortersObject },
    };
    newSorterState.sortersObject[currentSorter.type] = {
        ...currentSorter,
        ascendingDirection: sorterState.active !== currentSorter.type ? true : !currentSorter.ascendingDirection,
    }
    const newList = sortFunction(list, newSorterState);
    dispatch(fetchBookListSuccess({
        list: newList,
        filterState,
        sorterState: newSorterState
    }));
}

const fetchFavoritesListRequest = () => {
    return {
        type: "FETCH_FAVORITES_LIST_REQUEST",
    }
};
const fetchFavoritesListSuccess = (data) => {
    return {
        type: "FETCH_FAVORITES_LIST_SUCCESS",
        payload: data,
    }
};
const fetchFavoritesListFailure = (error) => {
    return {
        type: "FETCH_FAVORITES_LIST_FAILURE",
        payload: error,
    }
};

const fetchFavorites = (dispatch, ownProps) => () => {
    const { bookService } = ownProps;
    const cookieArray = cookieMethods.getCookieValue();
    const filter = {
        id: { name: "id", text: "", value: "array-exact", type: "array-exact", options: cookieArray, },
    };
    dispatch(fetchFavoritesListRequest());
    bookService.getFilteredBooks(filter)
            .then(data => dispatch(fetchFavoritesListSuccess({
                favorites: sortFunction(data.list, initialSorter),
                sorterState: initialSorter,
            })))
            .catch(err => dispatch(fetchFavoritesListFailure(err)))
}

export {
    fetchBooks,
    fetchFilteredBooks,
    addSortedBooks,
    fetchFavorites,
};