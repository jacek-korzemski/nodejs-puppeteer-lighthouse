// SETUP SERVER
const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

// SETUP PUPPETEER && LIGHTHOUSE
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const { URL } = require("url");

const getResult = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    // Lighthouse will open the URL.
    // Puppeteer will observe `targetchanged` and inject our stylesheet.
    const { lhr } = await lighthouse(url, {
        port: new URL(browser.wsEndpoint()).port,
        output: "json",
        logLevel: "info",
    });

    await browser.close();

    return lhr;
};

const server = http.createServer(async (req, res) => {
    const url = /\/api\/lh\/v1\/(.*?)$/;

    if (req.url.match(url)) {
        const testUrl = req.url.replace("/api/lh/v1/", "");
        console.log("Testing: " + testUrl);
        const result = await getResult(testUrl);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(result));
        res.end();
    } else {
        res.setHeader("Content-Type", "text/html");
        res.end("<!doctype html><html><head><title>Test server</title></head><body>Server is running</body></html>");
    }
});

const runServer = () => {
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
};

runServer();

module.exports = server;
