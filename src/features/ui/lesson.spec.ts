import { HomePage, LessonPage, UIGlobalBrowser } from "../../main";
import { expect } from "chai";

const jestTimeout = 50000;
const pages = [HomePage, LessonPage];

describe("Lesson page: Completing the lesson", () => {
  beforeAll(async (done) => {
    const context = await UIGlobalBrowser.getNewIncognitoBrowserContext();
    await Promise.all(pages.map((page) => page.init(context)));
    done();
  }, jestTimeout);

  afterAll(async (done) => {
    await Promise.all(pages.map((page) => page.close()));
    done();
  }, jestTimeout);

  it(
    "Step 1. Navigate to home page and click on selected lesson",
    async () => {
      await HomePage.navigateTo();
      expect(await HomePage.getLessonTitle(0)).to.equal("You Are What You Eat");
      expect(await HomePage.ifTestPassed(0)).false;
      await HomePage.openLessonPage(0);
    },
    jestTimeout
  );

  it(
    "Step 2. Answer the first question",
    async () => {
      await LessonPage.elements.testTitle.waitFor();

      expect(await LessonPage.getQuestionNumber()).to.equal(1);
      expect(await LessonPage.getQuestionText()).to.equal(
        "Energy cones from calories"
      );
      expect(await LessonPage.getAnswersCount()).to.equal(2);
      await LessonPage.selectAnswer(0);
      expect(await LessonPage.ifAnswerSelected(0)).true;
      expect(await LessonPage.ifAnswerSelected(1)).false;
      expect(
        await LessonPage.elements.questionField.continueButton.getText()
      ).to.equal("CONTINUE");
      await LessonPage.pressContinueButton();
    },
    jestTimeout
  );

  it(
    "Step 3. Answer the second question",
    async () => {
      expect(await LessonPage.getQuestionNumber()).to.equal(2);
      expect(await LessonPage.getQuestionText()).to.equal(
        "A healthy diet is about _____. Select three"
      );
      expect(await LessonPage.getAnswersCount()).to.equal(4);
      for (const index of [0, 1, 2]) {
        await LessonPage.selectAnswer(index);
        expect(await LessonPage.ifAnswerSelected(index)).true;
      }
      expect(await LessonPage.ifAnswerSelected(3)).false;
      expect(
        await LessonPage.elements.questionField.continueButton.getText()
      ).to.equal("CHECK ANSWER");
      await LessonPage.pressContinueButton();
    },
    jestTimeout
  );

  it(
    "Step 3. Return to home page",
    async () => {
      await HomePage.elements.header.waitFor();
      expect(await HomePage.ifTestPassed(0)).true;
    },
    jestTimeout
  );
});
