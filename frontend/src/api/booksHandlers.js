const path = require("path");
const Book = require("../book");
const bookStore = require("../store/books");

const addBookHandler = (req, res) => {
	const { books } = bookStore;
	if (req.files) {
		const { path: pathFileCover, originalname: originalNameFileCover } =
			req.files["filecover"][0];
		const { path: pathFileBook, originalname: originalNameFileBook } =
			req.files["filebook"][0];

		const newBook = new Book(
			req.body.title,
			req.body.description,
			req.body.authors,
			req.body.favorite,
			"/" + pathFileCover,
			req.body.fileName,
			"/" + pathFileBook,
			originalNameFileCover,
			originalNameFileBook
		);

		books.push(newBook);
		res.status(201);
		res.json(newBook);
	}
};

const deleteBookHandler = (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books.splice(index, 1);
		res.json("ok");
	} else {
		res.status(404);
		res.json("Code: 404");
	}
};

const downloadBookHandler = (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (books[index].filebook) {
		res.download(
			path.join(__dirname, "../../", books[index].filebook),
			books[index].originalName
		);
	} else {
		res.status(404);
		res.json("Code: 404");
	}
};

const getBookHandler = (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const book = books.find((book) => book.id === id);
	if (book) {
		res.json(book);
	} else {
		res.status(404);
		res.json("Code: 404");
	}
};

const getAllBooksHandler = (req, res) => {
	const { books } = bookStore;
	res.json(books);
};

const updateBookHandler = (req, res) => {
	const { books } = bookStore;
	const { title, description, authors, favorite, fileName } = req.body;
	const { path: pathFileCover, originalname: originalNameFileCover } =
		req.files["filecover"][0];
	const { path: pathFileBook, originalname: originalNameFileBook } =
		req.files["filebook"][0];
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index],
			title,
			description,
			authors,
			favorite,
			filecover: pathFileCover,
			fileName,
			filebook: pathFileBook,
			originalNameFileCover,
			originalNameFileBook,
		};
		res.json(books[index]);
	} else {
		res.status(404);
		res.json("Code: 404");
	}
};

module.exports = {
	get: getBookHandler,
	getAll: getAllBooksHandler,
	add: addBookHandler,
	delete: deleteBookHandler,
	update: updateBookHandler,
	download: downloadBookHandler,
};
