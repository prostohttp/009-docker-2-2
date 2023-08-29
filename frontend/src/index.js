const express = require("express");
const path = require("path");

// middleware
const notFound = require("./middleware/404");
// routes
const apiBooksRouter = require("./routes/apiBooksRouter");
const apiUserRouter = require("./routes/apiUserRouter");
const uiRouter = require("./routes/uiRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../", "src/views"));
app.use("/public", express.static(path.join(__dirname, "../", "public")));
// api
app.use("/api/books/", apiBooksRouter);
app.use("/api/user/", apiUserRouter);
app.use("/", uiRouter);
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
