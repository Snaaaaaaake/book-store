import React from 'react';

import Spinner from '../Spinner/Spinner';
import ErrorElement from '../ErrorElement/ErrorElement';
import BookCard from '../BookCard/BookCard';

export default class ItemList extends React.Component {
    componentDidMount() {
        this.props.fetchItems();
    }

    render() {
        const { loading, error } = this.props.state;
        const { list, listName } = this.props;
        let Content;

        if (loading) {
            Content = () => <Spinner/>;
        } else if (error) {
            Content = () => <ErrorElement error={error} />;
        } else if (list.length === 0) {
            Content = () => <div>Ничего не найдено!</div>;
        } else {
            Content = () => list.map(book => <BookCard key={`book${book.id}`} book={book} />)
        }
        return <>
            <h5 className="w-100 mb-4 text-center">{listName}</h5>
            <Content/>
        </>;
    }
};