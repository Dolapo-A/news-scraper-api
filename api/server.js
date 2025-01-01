const express = require("express");
const cors = require("cors");
const { scrapeNews } = require("../scrapers");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS with restricted origin
app.use(cors({
  origin: 'http://10.236.198.79',  // Allow only this origin
}));
app.use(express.json());


// New route to support news outlet selection
app.get("/api/:outlet", async (req, res) => {
	try {
		const { outlet } = req.params;

		// Predefined URLs for different news outlets
		const outletUrls = {
			techcrunch: "https://techcrunch.com/",
			techradar: "https://www.techradar.com/news",
			hackernews: "https://news.ycombinator.com/",
			//
			// technewsworld: "https://www.technewsworld.com/section/technology",
			// theverge: "https://www.theverge.com/",
			// geekwire: "https://www.geekwire.com/",
			// Add more outlets as needed
		};

		// Check if the requested outlet exists
		if (!outletUrls[outlet]) {
			return res.status(400).json({
				error: "Invalid news outlet",
				availableOutlets: Object.keys(outletUrls),
			});
		}

		// Scrape the specific outlet's URL
		const articles = await scrapeNews(outletUrls[outlet]);
		res.json(articles);
	} catch (error) {
		console.error("Scraping error:", error);
		res.status(500).json({
			error: "Failed to scrape articles",
			details: error.message,
		});
	}
});

app.listen(PORT, () => {
	console.log(`News Scraper API running on port ${PORT}`);
});
