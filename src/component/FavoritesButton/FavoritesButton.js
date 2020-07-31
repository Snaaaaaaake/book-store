import React from 'react';
import { Link } from 'react-router-dom';

const FavoritesButton = () => <div className="text-right mb-3">
    <Link to="/favorites" type="button" className="btn btn-light">К списку избранных книг</Link>
</div>;

export default FavoritesButton;