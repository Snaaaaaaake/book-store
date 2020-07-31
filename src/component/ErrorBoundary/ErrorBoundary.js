import React from 'react';

export default class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: error };
    }

    render() {
        return this.state.hasError ? 
        <div className="text-center my-4 w-100">
            {`Ошибка: ${this.state.error}`}
        </div> :
        this.props.children;
    }
}
