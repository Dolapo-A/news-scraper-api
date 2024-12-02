const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTheVerge(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		const $ = cheerio.load(response.data);
		const articles = [];

		$(".post").each((index, element) => {
			const title = $(element).find("h2, h3, .headline").text().trim();

			let link = $(element).find("a").first().attr("href");
			if (link && !link.startsWith("http")) {
				link = `https://www.theverge.com/${link}`;
			}

			const image = $(element).find("img").first().attr("src");

			if (title && link) {
				articles.push({ title, link, image });
			}
		});

		return articles;
	} catch (error) {
		console.error("TheVerge Scraping Error:", error);
		throw error;
	}
}

module.exports = { scrapeTheVerge };
