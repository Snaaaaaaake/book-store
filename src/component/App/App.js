import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import FilterSorterBlock from '../FilterSorterBlock/FilterSorterBlock';
import BookList from '../BookList/BookList';
import FavoritesList from '../FavoritesList/FavoritesList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import PageNotFound from '../PageNotFound/PageNotFound';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import MainPageButton from '../MainPageButton/MainPageButton';

const App = () => {
    return (
            <div className="container mt-5">
                <ErrorBoundary>
                    <Switch>
                        <Route path='/' exact component={FavoritesButton} />
                        <Route path='/favorites' exact component={MainPageButton} />
                    </Switch>
                    <Header/>
                    <Switch>
                        <Route path='/' exact component={FilterSorterBlock} />
                    </Switch>
                </ErrorBoundary>
            <div className="d-flex flex-row flex-wrap justify-content-around">
                <ErrorBoundary>
                    <Switch>
                        <Route path='/' exact component={BookList} />
                        <Route path='/favorites' exact component={FavoritesList} />
                        <Route component={PageNotFound} />
                    </Switch>
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default App;