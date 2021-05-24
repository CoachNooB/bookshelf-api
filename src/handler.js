/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-return-assign */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    res.code(201);
    return res;
  }

  const res = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  res.code(500);
  return res;
};

const getAllBookHandler = (req, h) => {
  const { name, reading, finished } = req.query;

  if (name) {
    const showBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase())).map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const res = h.response({
      status: 'success',
      data: {
        books: showBooks,
      },
    });
    res.code(200);
    return res;
  }

  if (reading) {
    const showBooks = books.filter((book) => (reading === '0' ? book.reading === false : book.reading === true)).map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const res = h.response({
      status: 'success',
      data: {
        books: showBooks,
      },
    });
    res.code(200);
    return res;
  }

  if (finished) {
    const showBooks = books.filter((book) => (finished === '0' ? book.finished === false : book.finished === true)).map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }));
    const res = h.response({
      status: 'success',
      data: {
        books: showBooks,
      },
    });
    res.code(200);
    return res;
  }

  const showBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return res = h.response({
    status: 'success',
    data: {
      books: showBooks,
    },
  });
};

const getBookByIdHandler = (req, h) => {
  const { id } = req.params;
  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  res.code(404);
  return res;
};

const editBookbyIdHandler = (req, h) => {
  const { id } = req.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = req.payload;
  const finished = readPage === pageCount;
  const updatedAt = new Date().toISOString();

  if (name === '' || name === undefined) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    res.code(400);
    return res;
  }

  if (readPage > pageCount) {
    const res = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    res.code(400);
    return res;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const res = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

const deleteBookById = (req, h) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const res = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    res.code(200);
    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookbyIdHandler, deleteBookById,
};
