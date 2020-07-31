import books from './books.json';

function timeout(data) {
    return new Promise((resolve, reject) => {
  
      if (Math.round(Math.random()*10) === 9) {
        reject(new Error('Тестовая ошибка (один раз из 10)'));
      }
  
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  }

export default class EmulatedBackend {
    emulatedFetch(adress, data) {
        switch (adress) {
            case '/all':
                return this.returnAllBooks();
            case '/filtered':
                return this.returnFilteredBooks(data.body);
            default:
                return new Error('404');
        }
    }

    returnAllBooks() {
        return timeout(books);
    }

    returnFilteredBooks(filters) {
        let allFilteredBooks = books.list;
        const filtersKeys = Object.keys(filters);
        const notEmptyFiltersKeys = filtersKeys.filter(filterName => filters[filterName].value.length > 0);

        notEmptyFiltersKeys.forEach(filterName => {
            const { value: filterRawValue, type: filterType } = filters[filterName];
            const filterValue = filterRawValue.trim().toLowerCase();
            let currentlyFilteredBooks;
            switch (filterType) {
            case "more":
                currentlyFilteredBooks = allFilteredBooks.filter(book => book[filterName] > filterValue);
                allFilteredBooks = [ ...currentlyFilteredBooks ];
                break;
            case "less":
                currentlyFilteredBooks = allFilteredBooks.filter(book => book[filterName] < filterValue);
                allFilteredBooks = [ ...currentlyFilteredBooks ];
                break;
            case "includes":
                currentlyFilteredBooks = allFilteredBooks.filter(book => book[filterName].toLowerCase().includes(filterValue));
                allFilteredBooks = [ ...currentlyFilteredBooks ];
                break;
            case "date-exact":
                currentlyFilteredBooks = allFilteredBooks.filter(book => book[filterName].format("YYYY") === filterValue);
                allFilteredBooks = [ ...currentlyFilteredBooks ];
                break;
            case "array-exact":
                const filterValueArray = filters[filterName].options;
                currentlyFilteredBooks = filterValueArray.map(key => {
                    return allFilteredBooks.find(book => book.id === +key);
                });
                allFilteredBooks = [ ...currentlyFilteredBooks ];
                break;
            default:
                currentlyFilteredBooks = allFilteredBooks.filter(book => book[filterName].toLowerCase() === filterValue);
                allFilteredBooks = [ ...currentlyFilteredBooks ];
            }
        });

        const respond = {
            list: allFilteredBooks,
        }
        return timeout(respond);
    }
  }