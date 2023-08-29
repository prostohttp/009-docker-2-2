const express = require("express");
const apiBooks = require("../api/booksHandlers");
const fileMulter = require("../middleware/file");

const apiBooksRouter = express.Router();

apiBooksRouter.get("/:id", apiBooks.get);

apiBooksRouter.get("/", apiBooks.getAll);

apiBooksRouter.get("/:id/download", apiBooks.download);

apiBooksRouter.post(
	"/",
	fileMulter.fields([
		{ name: "filecover", maxCount: 1 },
		{ name: "filebook", maxCount: 1 },
	]),
	apiBooks.add
);

apiBooksRouter.put(
	"/:id",
	fileMulter.fields([
		{ name: "filecover", maxCount: 1 },
		{ name: "filebook", maxCount: 1 },
	]),
	apiBooks.update
);

apiBooksRouter.delete("/:id", apiBooks.delete);

module.exports = apiBooksRouter;
