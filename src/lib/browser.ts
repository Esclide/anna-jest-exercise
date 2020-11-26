import { Browser, BrowserContext, Page } from 'puppeteer';
import { Service, Container } from 'typedi';
const puppeteer = require('puppeteer');

let browser: Browser;

@Service()
export class GlobalBrowser {

  public newPage(): Promise<Page> {
    return browser.newPage();
  }

  public getDefaultBrowserContext(): BrowserContext {
    return browser.defaultBrowserContext();
  }

  /**
   * Get new incognito browser context
   * @returns {Promise<BrowserContext>}
   */
  public async getNewIncognitoBrowserContext(): Promise<BrowserContext> {
    const param_puppeteer = {
      args: [
        "--incognito",
        "--ignore-certificate-errors",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu"],
      headless: false
    };

    const browser = await puppeteer.launch(param_puppeteer);
    console.log(browser)
    return await browser.createIncognitoBrowserContext();
  }
}
