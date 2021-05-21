import { Cache } from 'cache-manager';
import { mock, MockProxy } from 'jest-mock-extended';
import Rate from 'src/core/domain/rate';
import * as moment from 'moment';
import IntegrationError from 'src/core/error/integration.error';
import DiarioFederationService from './diario.service';
import { scrape } from 'scrape-brrr';
jest.mock('scrape-brrr');
describe('DiarioFederationService', () => {
  let subject: DiarioFederationService;
  let cacheManagerMock: MockProxy<Cache>;

  beforeAll(() => {
    cacheManagerMock = mock<Cache>();
    subject = new DiarioFederationService(cacheManagerMock);
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
      expect(scrape).toBeCalledTimes(0);
    });
    it('should ignore local cache if throw exception', async () => {
      const r = ['22/12/1992', '19.50', '   10.20   ', '30.40 \n'];
      scrape.mockImplementation(() => r);
      const result = await subject.getExchangeRate();

      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(scrape).toBeCalledTimes(1);

      expect(result.provider).toBe('diarioFederation');
      expect(result.value).toBe(10.2);
      expect(cacheManagerMock.set).toBeCalledWith('diarioFederation', result);
      expect(moment(result.lastUpdated).format('DD/MM/yyyy')).toBe(r[0]);
    });

    it('should throw a integration error if occurs a error in scrape', async () => {
      cacheManagerMock.get.mockImplementation(() => {
        throw new Error();
      });
      scrape.mockImplementation(() => {
        throw new Error('blablabla error');
      });

      await expect(subject.getExchangeRate()).rejects.toThrow(IntegrationError);
      expect(cacheManagerMock.get).toBeCalledTimes(1);
      expect(scrape).toBeCalledTimes(1);
    });
  });
});
