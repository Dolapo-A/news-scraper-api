const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTechNewsWorld(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		const $ = cheerio.load(response.data);
		const articles = [];

		const selectors = [
			".post",
			".article",
			'[class*="article"]',
			'[class*="post"]',
			"article",
			".entry-title a",
			".main-content a",
			".story-storytype",
		];

		const uniqueTitles = new Set();

		selectors.forEach((selector) => {
			$(selector).each((index, element) => {
				const title =
					$(element).text().trim() ||
					$(element).find("h2, h3, .headline").text().trim();

				let link =
					$(element).attr("href") || $(element).find("a").first().attr("href");

				if (link && !link.startsWith("http")) {
					link = `https://www.technewsworld.com/section/technology${link}`;
				}

				const image = $(element).find("img").first().attr("src");

				if (title && link && !uniqueTitles.has(title)) {
					uniqueTitles.add(title);
					articles.push({ title, link, image: image || null });
				}
			});
		});

		console.log(`Total articles found: ${articles.length}`);
		return articles;
	} catch (error) {
		console.error("TechNewsWorld Scraping Error:", error);
		throw error;
	}
}

module.exports = { scrapeTechNewsWorld };
