/* eslint-disable linebreak-style */
const {
  addBookHandler,
  getAllBookHandler,
  getBookByIdHandler,
  editBookbyIdHandler,
  deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookbyIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById,
  },
];

module.exports = routes;
