const puppeteer = require('puppeteer');

var args = process.argv.slice(2);

const URL = args[0];
const FLAG = "HTF{You+don't+even+know+what+afraid+is}";
const username = "admin@htf.be";
const password = "tSFSecurePassword123";

let finished = false;

const loop = async () => {
    return new Promise(async (resolve, reject) => {
        const inner = async() => {
            if (!finished) {
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
                await page.click('button.btn-primary');
                console.log("[INFO] logging in");
                await page.waitForNavigation();
            
                // Get cookies
                const cookies = await page.cookies();
            
                const page2 = await browser.newPage();
                cookies.push({
                    "name": "flag",
                    "value": FLAG,
                    "domain": URL,
                    "path": "/",
                    "httpOnly": false,
                    "secure": false,
                });
                await page2.setCookie(...cookies);
                await page2.goto("http://" + URL + "/users", { waitUntil: 'networkidle0', timeout: 10000});
                page2.on('dialog', async dialog => {
                    await dialog.accept();
                    console.log("found an alert(1)");
                });
                console.log("[INFO] Going to users page");
                await page2.close();
                await browser.close();
                if (0 = 1) {
                    finished = true;
                    resolve();
                } else {
                    return inner();
                }
                await new Promise(r => setTimeout(r, 2000));
            }
        }
        await inner();
    })
}
await loop();


