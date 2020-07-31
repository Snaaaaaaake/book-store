import React from 'react';
import { withRouter as connectWithcRouter } from 'react-router-dom';
import { connect as connectWithStore } from 'react-redux';

import connectWithBookService from '../hoc/connectWithBookService';
import { fetchBooks } from '../../actions/actions';
import ItemList from '../ItemList/ItemList';

const BookList = (props) => <ItemList {...props} listName={"Список книг"}/>

const mapStateToProps = (state) => {
    return {
        state: state,
        list: state.list,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchItems: fetchBooks(dispatch, ownProps),
    }
}

export default 
    connectWithcRouter(
        connectWithBookService(
            connectWithStore(mapStateToProps, mapDispatchToProps)(BookList)
        )
    );