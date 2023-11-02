const puppeteer = require('puppeteer');

const URL = "http://192.168.1.108:8123/";
const FLAG = "HTF{You don't even know what afraid is}";
const JWT = "eyJpdiI6IlArWllsNjJWbnU5RElWT1lLaTJCSFE9PSIsInZhbHVlIjoiNDJLRnF0TXNkYjZGY2NJTWtoaHRlOVIyWENTTXVXaDNJZ3NnVERYN2lcLzdmVmJ1UVFUYTZ3NEErdXF6NitpYXQiLCJtYWMiOiIzZGI1NmIzNTc3NTI4MGE1YzcyZDgzNzFhZGIyMWY4MjZlOTgxYmQ0NWViYjA2ZjU1NjA3YWZmODE5Mzg1NzY2In0%3D";

(async () => {
    console.log('Browsing application');
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
    await page.setCookie({
        "name": "flag",
        "value": FLAG,
        "domain": "192.168.1.108",
        "path": "/",
        "httpOnly": false,
        "secure": false,
    });
    await page.setCookie({
        "name": "jumanji_fan_forum_session",
        "value": JWT,
        "domain": "192.168.1.108",
        "path": "/",
        "httpOnly": false,
        "secure": false,
    });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 10000});
    console.log("[INFO] rendered page: " + url);
    await page.close();
    await browser.close();
})();