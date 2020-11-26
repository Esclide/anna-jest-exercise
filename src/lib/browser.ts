import { BrowserContext } from "puppeteer";
import puppeteer = require("puppeteer");

const paramPuppeteer = {
  args: [
    "--incognito",
    "--ignore-certificate-errors",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--window-size=1920,1080",
    "--disable-accelerated-2d-canvas",
    "--disable-gpu",
  ],
  headless: false,
};

export class GlobalBrowser {
  public async getDefaultBrowserContext(): Promise<BrowserContext> {
    const browser = await puppeteer.launch(paramPuppeteer);
    return browser.defaultBrowserContext();
  }

  /**
   * Get new incognito browser context
   * @returns {Promise<BrowserContext>}
   */
  public async getNewIncognitoBrowserContext(): Promise<BrowserContext> {
    const browser = await puppeteer.launch(paramPuppeteer);
    return await browser.createIncognitoBrowserContext();
  }
}
