class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = 409;
  }
}
const dubleNameError = new ConflictError('Пользователь с такими данными уже существует.');
module.exports = { dubleNameError };