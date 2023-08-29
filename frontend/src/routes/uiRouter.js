const express = require("express");
const apiUi = require("../api/uiHandlers");
const fileMulter = require("../middleware/file");

const uiRouter = express.Router();

uiRouter.get("/", apiUi.index);

uiRouter.get("/books/create", apiUi.create);
uiRouter.post(
	"/books/create",
	fileMulter.fields([
		{ name: "filecover", maxCount: 1 },
		{ name: "filebook", maxCount: 1 },
	]),
	apiUi.add
);

uiRouter.get("/books/:id/update", apiUi.edit);
uiRouter.post(
	"/books/:id/update",
	fileMulter.fields([
		{ name: "filecover", maxCount: 1 },
		{ name: "filebook", maxCount: 1 },
	]),
	apiUi.update
);

uiRouter.get("/books/:id", apiUi.view);

uiRouter.get("/books/:id/delete", apiUi.delete);

module.exports = uiRouter;
