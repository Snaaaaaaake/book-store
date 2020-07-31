import filterTypes from '../constants/filterTypes';

// Создаём выпадающий список доступных авторов, издательств и пр.
export default function createFilterFunction(list) {
    const createdFilter = {};
    // Смотрим, какие фильтры должны быть в виде выпадающего списка
    const selectTypeFilters = Object.keys(filterTypes).filter(filterName => filterTypes[filterName].type === "select");
    selectTypeFilters.forEach(filterName => {
        // копируем настройки фильтра по умолчанию
        createdFilter[filterName] = { ...filterTypes[filterName] };
        // Проходим по массиву книг и собираем все поля для запрошенного фильтра,
        // помещаем их в массив options
        const options = {};
        list.forEach(book => options[book[filterName]] = true);
        createdFilter[filterName].options = Object.keys(options);
    });
    const respond = {
        ...filterTypes,
        ...createdFilter,
    };
    return respond;
}