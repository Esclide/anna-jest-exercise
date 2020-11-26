import { Activity } from "../entity/activity";
import { Bored } from "../../main";
import { expect } from "chai";

export class BoredAPIHelper {
  /**
   * Get random activity
   * @returns {Promise<Activity>}
   */
  public async getRandomActivity(): Promise<Activity> {
    const response = await Bored.getRandomActivity();
    expect(response.ok).true;
    return response.body as Activity;
  }

  /**
   * Get activity by key
   * @param {string} key
   * @returns {Promise<Activity>}
   */
  public async getActivityByKey(key: string): Promise<Activity> {
    const response = await Bored.getActivityByKey(key);
    expect(response.ok).true;
    return response.body as Activity;
  }

  /**
   * Get random activity by type
   * @param {string} type
   * @returns {Promise<Response>}
   */
  public async getRandomActivityByType(type: string): Promise<Activity> {
    const response = await Bored.getRandomActivityByType(type);
    expect(response.ok).true;
    return response.body as Activity;
  }
}
