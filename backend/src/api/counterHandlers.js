const redis = require("../database/redis");

const increaseCounter = async (req, res) => {
	const { bookId } = req.params;
	await redis.set(bookId);
	const value = await redis.get(bookId);
	res.json({ counter: value });
};

const getCounterValue = async (req, res) => {
	const { bookId } = req.params;
	const counter = await redis.get(bookId);
	res.json({ counter });
};

const deleteCounter = async (req, res) => {
	const { bookId } = req.params;
	const message = await redis.delete(bookId);
	res.json({ message });
};

module.exports = {
	inc: increaseCounter,
	get: getCounterValue,
	delete: deleteCounter,
};
