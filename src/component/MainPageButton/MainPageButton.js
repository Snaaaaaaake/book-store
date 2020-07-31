import React from 'react';
import { Link } from 'react-router-dom';

const MainPageButton = () => <div className="text-right mb-3">
    <Link to="/" type="button" className="btn btn-light">На главную страницу</Link>
</div>;

export default MainPageButton;