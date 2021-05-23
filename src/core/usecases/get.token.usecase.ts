import { AuthenticationServicePort } from '../ports/services/authentication.service';

export default class GetTokenUseCase {
  constructor(private readonly authService: AuthenticationServicePort) {}

  async execute(clientId: string, clientSecret: string): Promise<string> {
    return await this.authService.getAccessToken(clientId, clientSecret);
  }
}
