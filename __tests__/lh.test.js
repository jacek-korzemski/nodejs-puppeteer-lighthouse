// SETUP TEST SERVER
const http = require("http");
const hostname = "127.0.0.1";
const port = 9100;

// SETUP PUPPETEER
const puppeteer = require("puppeteer");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.write("<!doctype html><html><head><title>test server</title></head><body>Server is running.</body></html>");
    res.end();
});
server.listen(port, hostname);

test("Server should respond", async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto("http://127.0.0.1:9100/");

    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("is running");

    server.close();
    browser.close();
});
