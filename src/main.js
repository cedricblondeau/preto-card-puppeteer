const puppeteer = require('puppeteer');

const loginPageUrl = 'https://www.prestocard.ca/en-US/Pages/TransactionalPages/AccountLogin.aspx';
const loginPageUsernameInputSelector = 'input[id=SignIn_Username]';
const loginPagePasswordInputSelector = 'input[id=SignIn_Password]';
const loginPageSubmitSelector = 'button[id=btnsubmit]';
const dashboardBalanceSelector = 'p.dashboard__quantity';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36';

async function getBalance(username, password) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  page.setUserAgent(userAgent);
  await page.goto(loginPageUrl, { waitUntil: 'load' });

  await page.waitFor(loginPageUsernameInputSelector);
  await page.type(loginPageUsernameInputSelector, username);

  await page.waitFor(loginPagePasswordInputSelector);
  await page.type(loginPagePasswordInputSelector, password);

  await page.click(loginPageSubmitSelector);

  await page.waitForSelector(dashboardBalanceSelector);

  const balance = await page.evaluate(body => body.getElementsByClassName('dashboard__quantity')[0].innerText);
  browser.close();

  return balance;
}

module.exports = {
  getBalance,
};
