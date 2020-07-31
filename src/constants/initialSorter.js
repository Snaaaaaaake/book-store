const initialSorter = {
    active: 'title',
    sortersObject: {
        title: {
            type: 'title',
            name: 'По алфавиту',
            ascendingDirection: true,
        },
        raiting: {
            type: 'raiting',
            name: 'По рейтингу',
            ascendingDirection: true,
        },
        date: {
            type: 'date',
            name: 'По дате',
            ascendingDirection: true,
        }
    }, 
};

export default initialSorter;