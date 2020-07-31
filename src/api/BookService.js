import EmulatedBackend from './EmulatedBackend';

const emulatedBackend = new EmulatedBackend();

export default class BookService {
    getAllBooks() {
      return emulatedBackend.emulatedFetch('/all');
    }
    getFilteredBooks (filters) {
      return emulatedBackend.emulatedFetch('/filtered', { body: filters });
    }
}