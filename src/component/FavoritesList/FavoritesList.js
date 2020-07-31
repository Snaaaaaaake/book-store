import React from 'react';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import { connect as connectWithStore } from 'react-redux';

import connectWithBookService from '../hoc/connectWithBookService';
import { fetchFavorites } from '../../actions/actions';
import ItemList from '../ItemList/ItemList';

const BookList = (props) => <ItemList {...props} listName={"Список избранных книг"}/>

const mapStateToProps = (state) => {
    return {
        state: state,
        list: state.favorites,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItems: fetchFavorites(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithBookService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(BookList)
        )
    );