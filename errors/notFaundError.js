class NotFaundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFaundError';
    this.statusCode = 404;
  }
}

const userNotFaund = new NotFaundError('Пользователь по указанному _id не найден');
const movieNotFaund = new NotFaundError('Запись с указанным _id не найдена.');
const defaultNotFaund = new NotFaundError('Ресурс не найден или запрос сформирован неверно.');

module.exports = {
  movieNotFaund,
  userNotFaund,
  defaultNotFaund,
};