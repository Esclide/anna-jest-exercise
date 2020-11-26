import { Page } from 'puppeteer';

import { BaseElement } from './base-element'

export class TextElement extends BaseElement {
  constructor(selector: string, page: Page) {
    super(selector, page);
  }

  /**
   * Get inner text
   */
  public getText(): Promise<string> {
    return this.page.evaluate((selector: string) => {
      const el = document.querySelector<HTMLElement>(selector);
      if (el === null) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      return !el.textContent ? '' : el.textContent;
    }, this.selector);
  }

}
