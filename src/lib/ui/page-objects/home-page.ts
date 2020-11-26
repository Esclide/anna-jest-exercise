import { BrowserContext, Response } from 'puppeteer';
import { BasePagePo } from './base-page.po'
import { TextElement } from '../elements/text-element'
import { Service } from 'typedi';
import { assert } from "chai"

interface PageElements {
  header: TextElement;

  lessonsList: TextElement;
}

@Service()
export class HomePage extends BasePagePo {
  public elements!: PageElements;

  constructor() {
    super('/');
  }

  /**
   * Initialize Page object and its elements
   */
  public async init(context?: BrowserContext): Promise<void> {
    await super.init(context);

    this.elements = {
      header: new TextElement('selector', this.page),

      // Here should be selector of lessons table from the page (I can't get it from photo)
      lessonsList: new TextElement('#root lessons table selector', this.page),
    };
  }

  /**
   * Get lesson title by index
   * @param {number} index
   * @return {Promise<string>}
   */
  public async getLessonTitle(index: number): Promise<string> {
    return this.page.evaluate(
      (selector) => document.querySelector(selector).value,
      `${this.elements.lessonsList.selector} div:nth-child(${index}) button span`
    );
  }

  /**
   * Select lesson by index and open lesson page
   * @param {number} index
   * @return {Promise<void>}
   */
  public async openLessonPage(index: number): Promise<void> {
    return this.page.evaluate(
      (selector) => document.querySelector(selector).click,
      `${this.elements.lessonsList.selector} div:nth-child(${index}) button`
    );
  }

  /**
   * If test passed
   * @param {number} index
   * @return {Promise<boolean>}
   */
  public async ifTestPassed(index: number): Promise<boolean> {
    return !(await this.page.$(`${this.elements.lessonsList.selector} div:nth-child(${index}) div svg`))
  }
}
