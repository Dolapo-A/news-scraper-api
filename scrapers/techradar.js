const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTechRadar(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		const $ = cheerio.load(response.data);
		const articles = [];

		// More specific selectors for TechRadar
		const selectors = [
			'[class*="article-name"]',
			'[class*="article-title"]',
			'[class*="article-link"]',
			"article .content a",
			'[data-test-id="article-link"]',
		];

		// Comprehensive article extraction
		selectors.forEach((selector) => {
			$(selector).each((index, element) => {
				// Extract title
				const title =
					$(element).text().trim() ||
					$(element).attr("aria-label") ||
					$(element).find("h3").text().trim();

				// Extract link
				let link = $(element).attr("href");
				if (link && !link.startsWith("http")) {
					link = `https://www.techradar.com${link}`;
				}

				// Extract image (look in parent or sibling elements)
				let image =
					$(element).find("img").first().attr("src") ||
					$(element).parent().find("img").first().attr("src") ||
					$(element).siblings("img").first().attr("src");

				if (image && !image.startsWith("http")) {
					image = `https://www.techradar.com${image}`;
				}

				// Filter out irrelevant entries
				if (
					title &&
					link &&
					!title.toLowerCase().includes("explore news") &&
					title.length > 10
				) {
					articles.push({
						title,
						link,
						image: image || null,
					});
				}
			});
		});

		// Deduplicate articles based on title
		const uniqueArticles = Array.from(
			new Set(articles.map((a) => a.title))
		).map((title) => articles.find((a) => a.title === title));

		console.log("TechRadar Scraping Results:");
		console.log(`Total articles found: ${uniqueArticles.length}`);
		uniqueArticles.slice(0, 5).forEach((article, index) => {
			console.log(`\nArticle ${index + 1}:`);
			console.log("Title:", article.title);
			console.log("Link:", article.link);
			console.log("Image:", article.image);
		});

		return uniqueArticles;
	} catch (error) {
		console.error("TechRadar Scraping Error:", error);
		throw error;
	}
}

module.exports = { scrapeTechRadar };
