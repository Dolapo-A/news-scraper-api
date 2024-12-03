const axios = require("axios");
const techcrunchScraper = require("./techcrunch");
const techradarScraper = require("./techradar");
const hackernewsScraper = require("./hackernews");

const scrapers = {
	"techcrunch.com": techcrunchScraper.scrapeTechCrunch,
	"techradar.com": techradarScraper.scrapeTechRadar,
	"news.ycombinator.com": hackernewsScraper.scrapeHackerNews,
};

async function fetchWithAdvancedOptions(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				Accept:
					"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.5",
				"Accept-Encoding": "gzip, deflate, br",
				DNT: "1",
				Connection: "keep-alive",
				"Upgrade-Insecure-Requests": "1",
			},
			timeout: 10000, // 10 second timeout
			maxRedirects: 5,
		});
		return response.data;
	} catch (error) {
		console.error("Fetch error:", error.message);
		throw error;
	}
}

async function scrapeNews(url) {
	try {
		const domain = new URL(url).hostname.replace("www.", "");
		const scraper = Object.keys(scrapers).find((key) => domain.includes(key));

		if (!scraper) {
			throw new Error(`No scraper found for domain: ${domain}`);
		}

		// Pass the URL directly instead of fetching HTML
		const articles = await scrapers[scraper](url);

		// Filter and validate articles
		const validArticles = articles
			.filter(
				(article) =>
					article.title &&
					article.title.length > 0 &&
					article.link &&
					article.link.length > 0
			)
			.map((article) => ({
				title: article.title,
				link: article.link,
				image: article.image || null,
			}));

		console.log(`Total articles found: ${articles.length}`);
		console.log(`Valid articles: ${validArticles.length}`);

		return validArticles;
	} catch (error) {
		console.error("Comprehensive scraping error:", error);
		throw error;
	}
}

module.exports = { scrapeNews, fetchWithAdvancedOptions };
