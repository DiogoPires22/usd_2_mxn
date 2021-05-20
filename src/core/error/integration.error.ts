import { BusinessError } from './business.error';

export default class IntegrationError extends BusinessError {
  constructor(message: string, integrationCode = 'IN0001') {
    super(integrationCode, 500, message);
  }
}
