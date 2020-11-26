import {expect} from 'chai';
import { BoredHelper } from '../../main'



describe('BoredAPI tests', () => {
  it(
    'Get a random activity',
    async () => {
      const activityBody = await BoredHelper.getRandomActivity();
      expect(activityBody.error).to.be.undefined;
      expect(activityBody.activity).not.to.be.undefined;
    }
  );
  it(
    'Get an activity by its key',
    async () => {
      const activityBody = await BoredHelper.getActivityByKey('5881028');
      const expectedBody = {
        activity: "Learn a new programming language",
        accessibility: 0.25,
        type: "education",
        participants: 1,
        price: 0.1,
        key: "5881028",
        link: ''
      }
      expect(activityBody.error).to.be.undefined;
      expect(activityBody).to.deep.equal(expectedBody);
    }
  );
  it(
    'Get random activity by type',
    async () => {
      const activityBody = await BoredHelper.getRandomActivityByType('education');
      expect(activityBody.error).to.be.undefined;
      expect(activityBody.type).to.equal('education');
    }
  );
  it(
    'Get activity with non existing key',
    async () => {
      const activityBody = await BoredHelper.getActivityByKey('non-existing key');
      expect(activityBody.activity).to.be.undefined;
      expect(activityBody.error).to.equal('No activity found with the specified parameters');
    }
  );
  it(
    'Get activity with non existing type',
    async () => {
      const activityBody = await BoredHelper.getRandomActivityByType('non-existing type');
      expect(activityBody.activity).to.be.undefined;
      expect(activityBody.error).to.equal('No activity found with the specified parameters');
    }
  );
});