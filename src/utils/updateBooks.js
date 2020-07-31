import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default function updateBooks(books)  {
    return books.map(book => (
        { 
          ...book,
          date: moment(book.date),
        }
      )
    )
  }