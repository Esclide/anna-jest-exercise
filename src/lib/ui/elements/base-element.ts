import { Page } from 'puppeteer';
const defaultTimeout = 10000;

export class BaseElement {
  constructor(public readonly selector: string, protected readonly page: Page) {}

  /**
   * Wait for element appears
   * @returns {Promise<void>}
   */
  public async waitFor(customSelector?: string): Promise<void> {
    const msWaitTime = 100;
    const maxWaitTimes = defaultTimeout / msWaitTime;
    let counter = 0;
    if (!customSelector) {
      customSelector = this.selector;
    }
    while (maxWaitTimes >= counter) {
      if (await this.page.$(customSelector)) {
        break;
      }
      counter += 1;
      await new Promise((resolve) => setTimeout(resolve, msWaitTime));
    }
    await this.page.waitForSelector(customSelector, { timeout: defaultTimeout, visible: true });
  }
}
