// SETUP TEST SERVER
const http = require("http");
const server = require("./../src/lh");
const hostname = "127.0.0.1";
const port = 3000;

// SETUP PUPPETEER
const puppeteer = require("puppeteer");

test("Server should be running", async () => {
    server.listen(port, hostname);
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto("http://127.0.0.1:3000/");

    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("is running");

    browser.close();
    server.close();
});

test("Server should respond with data", async () => {
    server.listen(port, hostname);
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto("http://127.0.0.1:3000/api/lh/v1/http://example.com/");

    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("requestedUrl");
    expect(text).toContain("finalUrl");
    expect(text).toContain("fetchTime");

    browser.close();
    server.close();
}, 9000);
