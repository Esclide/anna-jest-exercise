import { BrowserContext, Response } from 'puppeteer';
import { BasePagePo } from './base-page.po'
import { TextElement } from '../elements/text-element'
import { Button } from '../elements/button'

interface PageElements {
  testTitle: TextElement;
  questionField: {
    questionNumber: TextElement;
    questionText: TextElement;
    continueButton: Button;
    answerButtonDefaultSelector: string;
  }
}

export class LessonPage extends BasePagePo {
  public elements!: PageElements;
  public backgroundColor = 'var(--white-500)';

  constructor() {
    super('/lessons/:lessonName/');
  }

  /**
   * Initialize Page object and its elements
   */
  public async init(context?: BrowserContext): Promise<void> {
    await super.init(context);

    this.elements = {
      testTitle: new TextElement('selector', this.page),
      questionField: {
        questionNumber: new TextElement('selector', this.page),
        questionText: new TextElement('selector', this.page),
        continueButton: new Button('selector button', this.page),
        answerButtonDefaultSelector: 'selector'
      }
    };
  }

  /**
   * Get question number
   * @return {Promise<number>}
   */
  public async getQuestionNumber(): Promise<number> {
    return parseInt((await this.elements.questionField.questionNumber.getText()).split(' ')[1], 10);
  }

  /**
   * Get question text
   * @return {Promise<string>}
   */
  public async getQuestionText(): Promise<string> {
    return await this.elements.questionField.questionText.getText();
  }

  /**
   * Select answer
   * @param {number} index
   * @return {Promise<void>}
   */
  public async selectAnswer(index: number): Promise<string> {
    return this.page.evaluate(
      (selector) => document.querySelector(selector).click,
      `${this.elements.questionField.answerButtonDefaultSelector} div:nth-child(${index}) button`
    );
  }

  /**
   * Press continue button
   * @return {Promise<void>}
   */
  public async pressContinueButton(): Promise<void> {
    await this.elements.questionField.continueButton.click();
    await this.page.waitFor(1000);
  }

  /**
   * Get answers count
   * @return {Promise<number>}
   */
  public async getAnswersCount(): Promise<number> {
    return this.page.evaluate((selector) => {
      return (Array.from(document.querySelectorAll(`${selector} tr`))).length;
    }, this.elements.questionField.answerButtonDefaultSelector);
  }

  /**
   * Check if answer is selected
   * @param {number} index
   * @return {Promise<number>}
   */
  public async ifAnswerSelected(index: number): Promise<boolean> {
    const elementColor: string = await this.page.evaluate(
      (selector) => document.querySelector(selector).color,
      `${this.elements.questionField.answerButtonDefaultSelector} div:nth-child(${index}) div`
    );
    return (elementColor !== this.backgroundColor);
  }
}
