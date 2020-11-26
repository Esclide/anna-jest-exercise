import { BrowserContext, Page } from 'puppeteer'
import { GlobalBrowser } from '../../browser'

const defaultTimeout = 20000;
const baseUrl = 'https://some-page.com/'

export class BasePagePo {
  public page!: Page;
  public context!: BrowserContext;
  private readonly path: string;
  private readonly browser!: GlobalBrowser;


  constructor(pathPrefix: string) {
    this.path = baseUrl + pathPrefix;
  }

  /**
   * Initialize Page object
   * @returns {Promise<void>}
   */
  public async init(context?: BrowserContext): Promise<void> {
    this.context = context || this.browser.getDefaultBrowserContext();
    this.page = await this.context.newPage();
  }

  /**
   * Close the page
   * @returns {Promise<void>}
   */
  public async close(): Promise<void> {
    return this.page.close();
  }

  /**
   * Navigate to Page object
   * @returns {Promise<void>}
   */
  public async navigateTo(parameters?: object): Promise<void> {
    await this.switchTo();
    let pathToNavigate: string = this.path;

    if (parameters) {
      for (const key of Object.keys(parameters)) {
        pathToNavigate = pathToNavigate.replace(`:${key}`, (parameters as any)[key]);
      }
    }

    await Promise.all([
      this.page.waitForNavigation(),
      this.page.goto(pathToNavigate, { waitUntil: 'networkidle0', timeout: defaultTimeout }),
    ]);
  }

  /**
   * Wait for page navigation
   * @returns {Promise<void>}
   */
  public async waitForNavigation(): Promise<void> {
    await this.page.waitForNavigation({ waitUntil: 'networkidle0', timeout: defaultTimeout });
  }

  /**
   * Switch to page tab
   * @returns {Promise<void>}
   */
  public async switchTo(): Promise<void> {
    await this.page.bringToFront();
  }
}
