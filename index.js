const express = require('express');
const request = require('request-promise');

require('dotenv').config();

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&autoparse=true`;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Welcome to Amazon Scraper API.`);
});

app.get('/products/:productID', async (req, res) => {
	const { productID } = req.params;

	try {
		const response = await request(
			`${SCRAPER_API_URL}&url=https://www.amazon.com/dp/${productID}`
		);
		return res.json(JSON.parse(response));
	} catch (error) {
		return res.json(error);
	}
});

app.get('/products/:productID/reviews', async (req, res) => {
	const { productID } = req.params;

	try {
		const response = await request(
			`${SCRAPER_API_URL}&url=https://www.amazon.com/product-reviews/${productID}`
		);
		return res.json(JSON.parse(response));
	} catch (error) {
		return res.json(error);
	}
});

app.get('/products/:productID/offers', async (req, res) => {
	const { productID } = req.params;

	try {
		const response = await request(
			`${SCRAPER_API_URL}&url=https://www.amazon.com/gp/offer-listing/${productID}`
		);
		return res.json(JSON.parse(response));
	} catch (error) {
		return res.json(error);
	}
});
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
