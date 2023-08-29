const { createClient } = require("redis");
const client = createClient();

const redisErrorHandler = () => {
	client.on("error", (err) => console.log("Redis Client Error", err));
};

const redisSetCounter = async (key) => {
	redisErrorHandler();
	await client.connect();
	if (await client.get(key)) {
		await client.set(key, parseInt(await client.get(key)) + 1);
	} else {
		await client.set(key, 1);
	}
	await client.disconnect();
};

const redisGetCounter = async (key) => {
	redisErrorHandler();
	await client.connect();
	if (await client.get(key)) {
		const count = await client.get(key);
		await client.disconnect();
		return count;
	} else {
		await client.disconnect();
		return 0;
	}
};

const redisDeleteCounter = async (key) => {
	redisErrorHandler();
	await client.connect();
	await client.del(key);
	await client.disconnect();
};

module.exports = {
	set: redisSetCounter,
	get: redisGetCounter,
	delete: redisDeleteCounter,
};
