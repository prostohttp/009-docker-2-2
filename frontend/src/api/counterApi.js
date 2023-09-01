const PORT = process.env.REQ_PORT || 3333;
const BASE_URL = process.env.BASE_URL || "http://backend:";

const fetchCounter = async (url, method = "GET") => {
	try {
		const request = await fetch(`${BASE_URL}${PORT}${url}`, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
		});
		return await request.json();
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	fetch: fetchCounter,
};
