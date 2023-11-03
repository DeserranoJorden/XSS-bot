const puppeteer = require('puppeteer');

var args = process.argv.slice(2);

const URL = process.argv[0];
const FLAG = "HTF{You+don't+even+know+what+afraid+is}";
const username = "admin@htf.be";
const password = "tSFSecurePassword123";

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        executablePath: '/usr/bin/google-chrome',
        args: [
            '--disable-gpu',
            '--disable-web-security',
            '--ignore-certificate-errors',
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto("http://" + URL + "/login");

    // Login
    await page.type('#email', username);
    await page.type('#password', password);
    await page.click('button[type="submit"]');
    console.log("[INFO] logging in");
    await page.waitForNavigation();

    // Get cookies
    const cookies = await page.cookies();

    const page2 = await browser.newPage();
    await page2.setCookie({
        "name": "flag",
        "value": FLAG,
        "domain": "127.0.0.1",
        "path": "/",
        "httpOnly": false,
        "secure": false,
    });
    await page2.setCookie(...cookies);
    await page2.goto("http://" + URL + "/users", { waitUntil: 'networkidle0', timeout: 10000});
    console.log("[INFO] Going to users page");
    await page2.close();
    await browser.close();
})();
