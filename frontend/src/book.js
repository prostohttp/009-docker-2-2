const { v4: uuid } = require("uuid");

class Book {
	/**
	 * Create a book.
	 * @param {string} title - The title of the book.
	 * @param {string} description - The description of the book.
	 * @param {string} authors - The authors of the book.
	 * @param {boolean} favorite - The favorite status of the book.
	 * @param {string} filecover - The file cover of the book.
	 * @param {string} fileName - The file name of the book.
	 * @param {string} filebook - The file of the book.
	 * @param {string} originalNameFileCover - The original name file cover of the book.
	 * @param {string} originalNameFileBook - The original name of file of the book.
	 * @param {string} id - The ID of the book.
	 */
	constructor(
		title = "",
		description = "",
		authors = "",
		favorite = false,
		filecover = "",
		fileName = "",
		filebook = "",
		originalNameFileCover = "",
		originalNameFileBook = "",
		id = uuid(),
	) {
		this.title = title;
		this.description = description;
		this.authors = authors;
		this.favorite = favorite;
		this.filecover = filecover;
		this.fileName = fileName;
		this.filebook = filebook;
		this.originalNameFileCover = originalNameFileCover;
		this.originalNameFileBook = originalNameFileBook;
		this.id = id;
	}
}

module.exports = Book;
