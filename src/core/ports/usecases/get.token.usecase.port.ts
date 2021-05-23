export interface GetTokenUseCasePort {
  execute(clientId: string, clientSecret: string): Promise<string>;
}

export namespace GetTokenUseCasePort {
  export const TOKEN = 'GetTokenUseCasePort';
}
