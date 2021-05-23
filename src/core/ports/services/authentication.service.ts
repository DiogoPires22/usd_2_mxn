export interface AuthenticationServicePort {
  getAccessToken(client_id: string, client_secret: string): Promise<string>;
}

export namespace AuthenticationServicePort {
  export const TOKEN = 'AuthenticationServicePort';
}
