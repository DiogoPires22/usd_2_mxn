import { BusinessError } from './business.error';

export default class IntegrationError extends BusinessError {
  constructor(message = '', integrationCode = 'IN0001') {
    super(integrationCode, 500, message);
  }
}
