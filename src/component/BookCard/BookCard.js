import React from 'react';
import CookieMethods from '../../utils/CookieMethods';

const cookieMethods = new CookieMethods("favoriteBooks");

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.raitingElement = React.createRef();
        this.id = props.book.id;
        this.state = {
            disabled: false,
            favorite: cookieMethods.contains(this.id)
        };
      }

    onRaitingChangeHandler = (newValue) => () => {
        const raitingValue = this.raitingElement.current.textContent;
        this.raitingElement.current.textContent = +raitingValue + newValue;
        this.setState({ disabled: true });
    }

    favoriteClickHandler = () => {
        cookieMethods.toggle(this.id);
        this.setState({ favorite: !this.state.favorite })
    }

    render() {
        const { book } = this.props;
        const { disabled, favorite } = this.state;
        return <>
            <div className="card mb-3" style={{width: '300px'}}>
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="my-0"><i>Автор:</i> {book.author}</p>
                    <p className="my-0"><i>Год:</i> {book.date}</p>
                    <p className="my-0"><i>Издатель:</i> {book.publisher}</p>
                    <p className="my-0">
                        <i>Рейтинг:</i>&nbsp;
                        <button
                            onClick={this.onRaitingChangeHandler(-1)}
                            className="btn btn-link"
                            title="Уменьшить рейтинг"
                            disabled={disabled}
                        >-</button>&nbsp;
                        <span ref={this.raitingElement}>{book.raiting}</span>&nbsp;
                        <button
                            onClick={this.onRaitingChangeHandler(1)}
                            className="btn btn-link"
                            title="Увеличить рейтинг"
                            disabled={disabled}
                        >+</button> 
                    </p>
                    <p className="my-0">
                        <button type="button"onClick={this.favoriteClickHandler} className="btn btn-outline-primary btn-sm">
                            { favorite ? "Удалить из избранного" : "Добавить в избранное" }
                        </button>
                    </p>
                </div>
            </div>
        </>;
    }
}
