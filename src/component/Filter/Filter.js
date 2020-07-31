import React from 'react';
import { connect as connectWithStore } from 'react-redux';

import { fetchFilteredBooks } from '../../actions/actions';
import connectWithBookService from '../hoc/connectWithBookService';
import filterTypes from '../../constants/filterTypes';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temporaryFilterState: {
                ...filterTypes,
                ...props.filterState,
            },
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.filterState !== prevProps.filterState) {
            this.setState({ temporaryFilterState: this.props.filterState });
        }
    }

    onChangeHandler = (filterObject) => (event) => {
        this.setState({
            temporaryFilterState: {
                ...this.state.temporaryFilterState,
                [filterObject.name]: { ...filterObject, value: event.target.value },
            }
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.fetchFilteredBooks(this.state.temporaryFilterState);
    }

    onClearHandler = (event) => {
        event.preventDefault();
        let resetFilter = {};
        const { temporaryFilterState } = this.state;
        const filterNames = Object.keys(temporaryFilterState);
        filterNames.forEach(filterName => resetFilter[filterName] = {
            ...temporaryFilterState[filterName],
            value: "",
        });
        this.props.fetchFilteredBooks(resetFilter);
    }

    render() {
        const { temporaryFilterState } = this.state;
        const filterNames = Object.keys(temporaryFilterState);
        return (
            <div className="d-flex flex-row flex-wrap justify-content-around mb-4">
                <h5>Фильтр</h5>
                <form onSubmit={this.onSubmitHandler} className="w-100">
                        {filterNames.map((filterName, number) => {
                            const filterObject = temporaryFilterState[filterName];
                            switch(filterObject.type) {
                                case "select":
                                    return <div key={`input${number}`} className="form-group">
                                            <label htmlFor={`formControlInput${number}`}>{filterObject.text}</label>
                                            <select
                                                id={`formControlInput${number}`}
                                                className="form-control"
                                                value={temporaryFilterState[filterName] ? temporaryFilterState[filterName].value : ""}
                                                onChange={this.onChangeHandler(temporaryFilterState[filterName])}
                                            >
                                                <option value=""></option>
                                                {filterObject.options.map((optionText, index) =>
                                                    <option
                                                        key={`${filterName}option${index}`}
                                                        value={optionText}
                                                    >{optionText}</option>
                                                )}
                                            </select>
                                        </div>
                                default:
                                    return <div key={`input${number}`} className="form-group">
                                        <label htmlFor={`formControlInput${number}`}>{filterObject.text}</label>
                                        <input
                                            onChange={this.onChangeHandler(temporaryFilterState[filterName])}
                                            type="text"
                                            className="form-control"
                                            id={`formControlInput${number}`}
                                            placeholder="Введите текст"
                                            value={temporaryFilterState[filterName] ? temporaryFilterState[filterName].value : ""}
                                        />
                                    </div>
                            }
                        })}
                    <button className="btn btn-outline-primary" type="submit">Отфильтровать</button>
                    <button className="btn btn-outline-secondary mx-2" type="reset" onClick={this.onClearHandler}>Очистить</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { filterState: state.filterState }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchFilteredBooks: fetchFilteredBooks(dispatch, ownProps),
    }
}

export default 
    connectWithBookService(
        connectWithStore(mapStateToProps, mapDispatchToProps)(Filter)
    );