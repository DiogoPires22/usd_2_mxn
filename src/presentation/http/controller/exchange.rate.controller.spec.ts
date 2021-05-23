import { mock, MockProxy } from 'jest-mock-extended';
import IntegrationError from 'src/core/error/integration.error';
import { GetExchangeRatePort } from 'src/core/ports/usecases/get.exchange.rate.port';
import {
  ExchangeRateResponse,
  ProviderResponse,
} from '../dto/response/exchange.rate.response';
import { ExchangeRateController } from './exchange.rate.controller';

describe('ExchangeRateController', () => {
  let subject: ExchangeRateController;
  let usecaseMock: MockProxy<GetExchangeRatePort>;

  beforeAll(() => {
    usecaseMock = mock<GetExchangeRatePort>();
    subject = new ExchangeRateController(usecaseMock);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('GET /api/v1/rate', () => {
    it('should return getExchangeRate if ok', async () => {
      const resultMock = new ExchangeRateResponse(
        new ProviderResponse(10, new Date()),
        new ProviderResponse(18.8, new Date()),
        new ProviderResponse(19.3, new Date()),
      );
      usecaseMock.execute.mockResolvedValueOnce(resultMock);

      const result = await subject.get();
      expect(usecaseMock.execute).toBeCalledTimes(1);
      expect(result).toBe(resultMock);
    });

    it('should throw a Integration Error', async () => {
      usecaseMock.execute.mockImplementation(() => {
        throw new IntegrationError();
      });

      await expect(subject.get()).rejects.toThrow(IntegrationError);
    });
  });
});
