import { HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';
import BanxicoService from './banxico.service';
import { mock, MockProxy } from 'jest-mock-extended';
import Rate from 'src/core/domain/rate';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as moment from 'moment';
import IntegrationError from 'src/core/error/integration.error';

describe('BanxicoService', () => {
  let subject: BanxicoService;
  let httpMock: MockProxy<HttpService>;
  let cacheManagerMock: MockProxy<Cache>;

  beforeAll(() => {
    httpMock = mock<HttpService>();
    cacheManagerMock = mock<Cache>();
    subject = new BanxicoService(httpMock, cacheManagerMock);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('getExchangeRate', () => {
    it('should return local cache if exists', async () => {
      const expectedResult = new Rate('banxico', 10.25, new Date());
      cacheManagerMock.get.mockResolvedValueOnce(expectedResult);
      const result = await subject.getExchangeRate();
      expect(result).toMatchObject(expectedResult);
      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(httpMock.get).toBeCalledTimes(0);
    });
    it('should ignore local cache if throw exception', async () => {
      const expectedResult = {
        bmx: {
          series: [
            {
              datos: [{ fecha: '22/12/1992', dato: 18.2 }],
            },
          ],
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
      expect(httpMock.get).toBeCalledTimes(1);
      const item = expectedResult.bmx.series[0].datos[0];
      expect(result.provider).toBe('banxico');
      expect(result.value).toBe(item.dato);
      expect(cacheManagerMock.set).toBeCalledWith('banxico', result);
      expect(moment(result.lastUpdated).format('DD/MM/yyyy')).toBe(item.fecha);
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
