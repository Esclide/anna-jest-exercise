import chai = require("chai");
import chaiHttp = require("chai-http");

import { ParsedUrlQueryInput } from "querystring";

chai.use(chaiHttp);

const BASE_URL: string = "http://www.boredapi.com/api/";

export class Request {
  public async getMethod<T>(
    path: string,
    query?: ParsedUrlQueryInput
  ): Promise<Response> {
    const request = chai
      .request(BASE_URL)
      .get(path)
      .query(query || {});

    const response = await request;
    return (response as unknown) as Response;
  }

  public async postMethod<T>(
    path: string,
    query?: ParsedUrlQueryInput,
    body?: object
  ): Promise<Response> {
    const request = chai
      .request(BASE_URL)
      .post(path)
      .query(query || {});
    const response = await request.send(body);
    return (response as unknown) as Response;
  }
}
