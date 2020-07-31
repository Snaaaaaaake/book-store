import React from 'react';
import { ServiceConsumer } from '../ServiceContext/ServiceContext';

export default function connectWithBookService(Wrapped) {
    return (props) => {
        return (
            <ServiceConsumer>
                {
                    (value) => {
                        return <Wrapped {...props} bookService={value} />
                    }
                }
            </ServiceConsumer>
        );
    }
};