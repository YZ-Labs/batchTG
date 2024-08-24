const puppeteer = require("puppeteer-extra");
const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./data.json");
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

async function autoFillForm() {
  // puppeteer usage as normal
  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    dumpio: true,
    autoClose: false,
    args: ["--no-sandbox", "--window-size=1366,850"],
  });
  
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  let count = 20
  for (const item of data) {
    count++
    console.log(count)
    await page.goto(item); 
    const randomWaitTime = Math.floor(14000);
    await sleep(randomWaitTime);
    await page.click(".js-default-download");
    await sleep(randomWaitTime);
  }
  // await browser.close();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

autoFillForm();
