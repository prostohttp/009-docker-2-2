const bookStore = require("../store/books");
const Book = require("../book");
const counter = require("../api/counterApi");

const indexHandler = (req, res) => {
	const { books } = bookStore;
	res.render("books/index", { books: books });
};

const createHandler = (req, res) => {
	res.render("books/create", { books: bookStore });
};

const addBookHandler = (req, res) => {
	const { books } = bookStore;
	const { title, description, authors, favorite } = req.body;
	if (req.files) {
		const { path: pathFileCover, originalname: originalNameFileCover } =
			req.files["filecover"][0];
		const { path: pathFileBook, originalname: originalNameFileBook } =
			req.files["filebook"][0];

		const newBook = new Book(
			title,
			description,
			authors,
			favorite,
			"/" + pathFileCover,
			req.body.fileName,
			"/" + pathFileBook,
			originalNameFileCover,
			originalNameFileBook
		);

		books.unshift(newBook);
		res.status(201);
		res.redirect("/");
	}
};

const editHandler = (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const book = books.find((book) => book.id === id);
	if (book) {
		res.render("books/update", { book: book });
	} else {
		res.status(404);
		res.render("notFound");
	}
};

const updateHandler = (req, res) => {
	const { books } = bookStore;
	const { title, description, authors, favorite, fileName } = req.body;
	const fileCover = req.files["filecover"][0];
	const fileBook = req.files["filebook"][0];
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books[index] = {
			...books[index],
			title,
			description,
			authors,
			favorite,
			fileCover: "/" + fileCover.path,
			fileName,
			fileBook: "/" + fileBook.path,
			originalNameFileCover: fileCover.originalname,
			originalNameFileBook: fileBook.originalname,
		};
		res.status(204);
		res.redirect(`/books/${id}/update`);
	} else {
		res.status(404);
		res.render("notFound");
	}
};

const viewHandler = async (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		const response = await counter.fetch(`/counter/${id}/incr`, "POST");
		res.render("books/view", { book: books[index], count: response.counter });
	} else {
		res.status(404);
		res.render("notFound");
	}
};

const deleteHandler = async (req, res) => {
	const { books } = bookStore;
	const { id } = req.params;
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		await counter.fetch(`/counter/${id}/del`, "POST");
		books.splice(index, 1);
		res.redirect("/");
	} else {
		res.status(404);
		res.render("notFound");
	}
};

module.exports = {
	index: indexHandler,
	create: createHandler,
	add: addBookHandler,
	edit: editHandler,
	update: updateHandler,
	view: viewHandler,
	delete: deleteHandler,
};
