import React from 'react';
import { connect as connectWithStore } from 'react-redux';

import { addSortedBooks } from '../../actions/actions';
import connectWithBookService from '../hoc/connectWithBookService';
import { findSorterDirection, findSorterFontWeight } from '../../utils/createSorterElement';

class Sorter extends React.Component {
    onClickHandler = (currentSorter) => () => {
        this.props.addSortedBooks(currentSorter);
    }

    render() {
        const { sorterState: { sortersObject: sorters, active: activeSorter } } = this.props.state;
        return (
            <div className="my-3">
                <span>Сортировка </span>
                {Object.keys(sorters).map(sorterName => {
                    const sorter = sorters[sorterName];
                    return <button
                        key={`Sorter_${sorter.type}`}
                        onClick={this.onClickHandler(sorter)}
                        type="button"
                        className="btn btn-outline-primary btn-sm mx-1 my-1"
                    >
                        { findSorterFontWeight(sorter, activeSorter) }: { findSorterDirection(sorter) }
                    </button>
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const updatedOwnProps = {
        ...ownProps,
        ...stateProps,
    }
    return {
      ...stateProps,
      addSortedBooks: addSortedBooks(dispatch, updatedOwnProps),
    }
  }

export default 
    connectWithBookService(
        connectWithStore(mapStateToProps, null, mergeProps)(Sorter)
    );