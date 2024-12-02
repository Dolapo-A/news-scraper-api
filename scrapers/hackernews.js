const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeHackerNews(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		const $ = cheerio.load(response.data);
		const articles = [];

		// Comprehensive selector strategy
		const selectors = [
			".athing",
			".storylink",
			".titlelink",
			'[class*="title"] a',
			"td.title a",
		];

		// Deduplication set
		const uniqueTitles = new Set();

		selectors.forEach((selector) => {
			$(selector).each((index, element) => {
				// Extract title
				const title = $(element).text().trim();

				// Extract link
				let link = $(element).attr("href");
				if (link && !link.startsWith("http")) {
					link = link.startsWith("/")
						? `https://news.ycombinator.com${link}`
						: `https://news.ycombinator.com/${link}`;
				}

				// Avoid duplicates
				if (title && link && !uniqueTitles.has(title)) {
					uniqueTitles.add(title);
					articles.push({ title, link });
				}
			});
		});

		// console.log("Hacker News Scraping Results:");
		// console.log(`Total articles found: ${articles.length}`);
		// articles.slice(0, 5).forEach((article, index) => {
		// 	console.log(`\nArticle ${index + 1}:`);
		// 	console.log("Title:", article.title);
		// 	console.log("Link:", article.link);
		// });

		return articles;
	} catch (error) {
		console.error("Hacker News Scraping Error:", error);
		throw error;
	}
}

module.exports = { scrapeHackerNews };
