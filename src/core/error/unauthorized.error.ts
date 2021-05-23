import { BusinessError } from './business.error';

export default class UnauthorizedError extends BusinessError {
  constructor(message = '', integrationCode = 'IN0002') {
    super(integrationCode, 401, message);
  }
}
