const axios = require("axios");
const cheerio = require("cheerio");

async function debugScraper(url) {
	try {
		// Fetch the webpage
		const response = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
		});

		// Get raw HTML
		const html = response.data;

		// Basic HTML checks
		console.log("--- HTML DEBUGGING ---");
		console.log("Total HTML Length:", html.length);
		console.log("First 500 characters:\n", html.slice(0, 500));

		// Load HTML with Cheerio
		const $ = cheerio.load(html);

		// Debugging selectors
		const selectors = [
			"article",
			".article",
			".post",
			'[class*="article"]',
			'[data-type="article"]',
			".post-block", // TechCrunch specific
			".story-storytype",
			// ".search-text",
		];

		// const selectors = [
		// 	".athing", // Hacker News uses this class for story items
		// 	".title a", // Direct link selector
		// 	".storylink", // Alternative link selector
		// 	".titlelink", // Another potential selector
		// ];

		console.log("\n--- SELECTOR DEBUGGING ---");
		selectors.forEach((selector) => {
			const elements = $(selector);
			console.log(`Selector "${selector}": ${elements.length} matches`);

			// If matches found, log first few
			if (elements.length > 0) {
				elements.slice(0, 3).each((index, element) => {
					console.log(`\n  Match ${index + 1}:`);
					console.log(
						"  Title:",
						$(element).find("h2, h3, .title, a").text().trim()
					);
					console.log("  Link:", $(element).find("a").first().attr("href"));
				});
			}
		});

		// console.log("\n--- SELECTOR DEBUGGING ---");
		// selectors.forEach((selector) => {
		// 	const elements = $(selector);
		// 	console.log(`Selector "${selector}": ${elements.length} matches`);

		// 	// If matches found, log first few
		// 	if (elements.length > 0) {
		// 		elements.slice(0, 3).each((index, element) => {
		// 			console.log(`\n  Match ${index + 1}:`);
		// 			console.log("  Title:", $(element).text().trim());
		// 			console.log("  Link:", $(element).attr("href"));
		// 		});
		// 	}
		// });
	} catch (error) {
		console.error("Debugging Error:", error.message);
	}
}

// Export for direct use
module.exports = { debugScraper };
