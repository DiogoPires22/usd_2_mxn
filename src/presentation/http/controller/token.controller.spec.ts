import { mock, MockProxy } from 'jest-mock-extended';
import IntegrationError from 'src/core/error/integration.error';
import { GetTokenUseCasePort } from 'src/core/ports/usecases/get.token.usecase.port';
import { GetTokenRequest } from '../dto/get.token.request';
import { TokenController } from './token.controller';

describe('TokenController', () => {
  let subject: TokenController;
  let usecaseMock: MockProxy<GetTokenUseCasePort>;

  beforeAll(() => {
    usecaseMock = mock<GetTokenUseCasePort>();
    subject = new TokenController(usecaseMock);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('POST /token', () => {
    it('should return GetTokenResponse if ok', async () => {
      const fakeBody = new GetTokenRequest();
      fakeBody.client_id = 'client_id';
      fakeBody.client_secret = 'client_secret';

      const accessTokenMock = 'access_token_mock';
      usecaseMock.execute.mockResolvedValueOnce(accessTokenMock);

      const result = await subject.token(fakeBody);
      expect(usecaseMock.execute).toBeCalledWith(
        fakeBody.client_id,
        fakeBody.client_secret,
      );
      expect(result.access_token).toBe(accessTokenMock);
    });

    it('should throw a Integration Error', async () => {
      const fakeBody = new GetTokenRequest();
      fakeBody.client_id = 'client_id';
      fakeBody.client_secret = 'client_secret';

      usecaseMock.execute.mockImplementation(() => {
        throw new IntegrationError();
      });

      await expect(subject.token(fakeBody)).rejects.toThrow(IntegrationError);
    });
  });
});
