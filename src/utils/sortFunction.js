const sortFunction = (list, sorter) => {
    let newList;
    switch (sorter.active) {
        case 'date':
            if (sorter.sortersObject[sorter.active].ascendingDirection === true) {
                newList = list.sort((a,b) => a.date - b.date);
            } else {
                newList = list.sort((a,b) => b.date - a.date);
            }
            break;
        case 'raiting':
            if (sorter.sortersObject[sorter.active].ascendingDirection === true) {
                newList = list.sort((a,b) => a.raiting - b.raiting);
            } else {
                newList = list.sort((a,b) => b.raiting - a.raiting);
            }
            break;
        default:
            if (sorter.sortersObject[sorter.active].ascendingDirection === true) {
                newList = list.sort((a,b) => a.title.localeCompare(b.title));
            } else {
                newList = list.sort((a,b) => a.title.localeCompare(b.title)).reverse();
            }
    }
    return newList;
}

export default sortFunction;