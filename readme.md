# News Scraper API

## Description

The News Scraper API is a Node.js application that scrapes articles from various news outlets, including TechCrunch, TechRadar, and Hacker News. It provides a simple API to fetch the latest articles from these sources based on the selected outlet.

## Features

- Scrapes articles from multiple news outlets.
- Returns structured JSON data including article titles, links, and images.
- Supports CORS for cross-origin requests.
- Handles errors gracefully with informative messages.

## Installation

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node package manager)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Dolapo-A/news-scraper.git
   cd news-scraper
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   node api/server.js
   ```

4. The API will be running on `http://localhost:3000`.

## Usage

To fetch articles from a specific news outlet, make a GET request to the following endpoint:

GET /api/:outlet

### Example Requests

- For TechCrunch:

  ```bash
  curl http://localhost:3000/api/techcrunch
  ```

- For TechRadar:

  ```bash
  curl http://localhost:3000/api/techradar
  ```

- For Hacker News:
  ```bash
  curl http://localhost:3000/api/hackernews
  ```

### Response Format

The API returns a JSON array of articles, each containing:

- `title`: The title of the article.
- `link`: The URL to the article.
- `image`: The URL of the article's image (if available).

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Axios](https://axios-http.com/) for making HTTP requests.
- [Cheerio](https://cheerio.js.org/) for parsing and manipulating HTML.
