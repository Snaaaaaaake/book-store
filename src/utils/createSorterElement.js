import React from 'react';

const findSorterDirection = (sorter) => sorter.ascendingDirection === true ? <span>по возрастанию</span> : <span>по убыванию</span>;
const findSorterFontWeight = (sorter, activeSorter) => sorter.type === activeSorter ? <b>{sorter.name}</b> : <span>{sorter.name}</span>;

export { findSorterDirection, findSorterFontWeight };