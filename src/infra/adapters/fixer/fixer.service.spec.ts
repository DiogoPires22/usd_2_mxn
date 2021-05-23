import { HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { mock, MockProxy } from 'jest-mock-extended';
import Rate from 'src/core/domain/rate';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as moment from 'moment';
import IntegrationError from 'src/core/error/integration.error';
import FixerService from './fixer.service';

describe('FixerService', () => {
  let subject: FixerService;
  let httpMock: MockProxy<HttpService>;
  let cacheManagerMock: MockProxy<Cache>;
  const tokenMock = 'token_mock';

  beforeAll(() => {
    httpMock = mock<HttpService>();
    cacheManagerMock = mock<Cache>();
    subject = new FixerService(httpMock, cacheManagerMock, tokenMock);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('getExchangeRate', () => {
    it('should return local cache if exists', async () => {
      const expectedResult = new Rate('fixer', 10.25, new Date());
      cacheManagerMock.get.mockResolvedValueOnce(expectedResult);
      const result = await subject.getExchangeRate();
      expect(result).toMatchObject(expectedResult);
      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledTimes(0);
    });
    it('should ignore local cache if throw exception', async () => {
      const expectedResult = {
        success: true,
        timestamp: moment().unix(),
        rates: {
          USD: 1,
          MXN: 10,
        },
      };
      const r = {
        data: expectedResult,
        status: 200,
        statusText: '200',
        headers: {},
        config: null,
      } as AxiosResponse;
      cacheManagerMock.get.mockImplementation(() => {
        throw new Error();
      });
      httpMock.get.mockImplementation(() => of(r));
      const result = await subject.getExchangeRate();

      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(
        `http://data.fixer.io/api/latest?symbols=USD,MXN&format=1&access_key=${tokenMock}`,
      );
      expect(result.provider).toBe('fixer');

      expect(result.value).toBe(
        expectedResult.rates.MXN / expectedResult.rates.USD,
      );
      expect(cacheManagerMock.set).toBeCalledTimes(1);
    });

    it('should throw exception if result is false', async () => {
      const expectedResult = {
        success: false,
        timestamp: moment().unix(),
        rates: {
          USD: 1,
          MXN: 10,
        },
      };
      const r = {
        data: expectedResult,
        status: 200,
        statusText: '200',
        headers: {},
        config: null,
      } as AxiosResponse;
      cacheManagerMock.get.mockImplementation(() => {
        throw new Error();
      });
      httpMock.get.mockImplementation(() => of(r));

      await expect(subject.getExchangeRate()).rejects.toThrow(IntegrationError);

      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledWith(
        `http://data.fixer.io/api/latest?symbols=USD,MXN&format=1&access_key=${tokenMock}`,
      );
      expect(httpMock.get).toBeCalledTimes(1);
    });

    it('should throw a integration error if occurs a error in api', async () => {
      cacheManagerMock.get.mockImplementation(() => {
        throw new Error();
      });
      httpMock.get.mockImplementation(() => {
        throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
      });

      await expect(subject.getExchangeRate()).rejects.toThrow(IntegrationError);
      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledTimes(1);
    });
  });
});
