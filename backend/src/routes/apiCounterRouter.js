const express = require("express");
const counter = require("../api/counterHandlers");

const apiCounterRouter = express.Router();

apiCounterRouter.get("/:bookId", counter.get);
apiCounterRouter.post("/:bookId/incr", counter.inc);
apiCounterRouter.post("/:bookId/del", counter.delete);

module.exports = apiCounterRouter;
