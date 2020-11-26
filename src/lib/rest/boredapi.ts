import { Service } from 'typedi';
import { Request } from './request';


@Service()
export class BoredAPI extends Request {

  /**
   * Get random activity
   * @returns {Promise<Response>}
   */
  public async getRandomActivity(): Promise<Response> {
    return await this.getMethod('activity/');
  }

  /**
   * Get activity by key
   * @param {string} key
   * @returns {Promise<Response>}
   */
  public async getActivityByKey(key: string): Promise<Response> {
    return await this.getMethod(`activity?key=${key}`);
  }

  /**
   * Get random activity by type
   * @param {string} type
   * @returns {Promise<Response>}
   */
  public async getRandomActivityByType(type: string): Promise<Response> {
    return await this.getMethod(`activity?type=${type}`);
  }
}
