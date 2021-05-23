import { Injectable } from '@nestjs/common';
import { HttpService, HttpStatus } from '@nestjs/common';
import IntegrationError from 'src/core/error/integration.error';
import UnauthorizedError from 'src/core/error/unauthorized.error';
import { AuthenticationServicePort } from 'src/core/ports/services/authentication.service';

@Injectable()
export default class Auth0Service implements AuthenticationServicePort {
  constructor(
    private readonly httpService: HttpService,
    private readonly audience: string = process.env.AUDIENCE_URL,
  ) {}
  async getAccessToken(
    client_id: string,
    client_secret: string,
  ): Promise<string> {
    try {
      console.log({
        client_id,
        client_secret,
        audience: this.audience,
        grant_type: 'client_credentials',
      });
      const result = await this.httpService
        .post(`https://usd2mxn.us.auth0.com/oauth/token`, {
          client_id,
          client_secret,
          audience: this.audience,
          grant_type: 'client_credentials',
        })
        .toPromise();

      if (result.data && result.data.access_token) {
        return result.data.access_token;
      }
      throw Error();
    } catch (e) {
      console.error('Auth0 Integration Error');
      if (e.response.status === HttpStatus.UNAUTHORIZED) {
        throw new UnauthorizedError();
      }

      console.error(e.message);
      throw new IntegrationError('Auth Integration');
    }
  }
}
