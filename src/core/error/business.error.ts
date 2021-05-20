export class BusinessError extends Error {
  public readonly code: string;
  public readonly httpCode: number;
  public readonly message: string;

  constructor(code: string, httpCode = 500, message = '') {
    super();
    this.code = code;
    this.httpCode = httpCode;
    this.message = message;
  }
}
