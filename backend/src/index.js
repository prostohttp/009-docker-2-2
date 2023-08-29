const express = require("express");
const apiCounterRouter = require("./routes/apiCounterRouter")

const app = express();

app.use("/counter",  apiCounterRouter);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});